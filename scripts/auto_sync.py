#!/usr/bin/env python3
"""Debounced, offline-tolerant content sync for the local personal site."""

from __future__ import annotations

import argparse
import datetime as dt
import os
import subprocess
import time
from pathlib import Path


CONTENT_PATHS = (
    "src/content",
    "src/data",
    "public/uploads",
)


def run(repo: Path, *args: str, check: bool = False) -> subprocess.CompletedProcess[str]:
    return subprocess.run(
        ["git", *args],
        cwd=repo,
        text=True,
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        check=check,
    )


def log(message: str) -> None:
    print(f"[{dt.datetime.now().astimezone().isoformat(timespec='seconds')}] {message}", flush=True)


def status(repo: Path) -> str:
    return run(repo, "status", "--porcelain", "--untracked-files=all", "--", *CONTENT_PATHS).stdout


def has_pending_commit(repo: Path) -> bool:
    result = run(repo, "rev-list", "--count", "origin/main..HEAD")
    return result.returncode == 0 and result.stdout.strip() not in {"", "0"}


def remote_is_reachable(repo: Path) -> bool:
    result = run(repo, "ls-remote", "--exit-code", "origin", "refs/heads/main")
    return result.returncode == 0


def notify(repo: Path, message: str) -> None:
    (repo / ".sync-status").write_text(message + "\n", encoding="utf-8")
    log(message)


def sync_once(repo: Path, dry_run: bool = False) -> bool:
    changes = status(repo)
    pending = has_pending_commit(repo)
    if not changes and not pending:
        return False

    if not remote_is_reachable(repo):
        notify(repo, "网络不可用，内容留在本地，等待自动重试")
        return False

    if dry_run:
        log("dry-run: would synchronize content")
        return True

    pull = run(repo, "pull", "--rebase", "--autostash", "origin", "main")
    if pull.returncode != 0:
        notify(repo, "远程更新或合并冲突，同步已暂停，请检查 .sync-status")
        return False

    if changes:
        run(repo, "add", "--", *CONTENT_PATHS, check=True)
        message = f"content: auto sync {dt.datetime.now().astimezone().strftime('%Y-%m-%d %H:%M')}"
        commit = run(repo, "commit", "-m", message)
        if commit.returncode != 0 and "nothing to commit" not in commit.stdout:
            notify(repo, "自动提交失败，同步已暂停")
            return False

    push = run(repo, "push", "origin", "main")
    if push.returncode != 0:
        notify(repo, "推送失败，已保留本地提交，网络恢复后自动重试")
        return False

    try:
        (repo / ".sync-status").unlink()
    except FileNotFoundError:
        pass
    log("内容已同步到 GitHub")
    return True


def main() -> int:
    parser = argparse.ArgumentParser()
    parser.add_argument("--repo", default=str(Path(__file__).resolve().parents[1]))
    parser.add_argument("--interval", type=int, default=20)
    parser.add_argument("--debounce", type=int, default=30)
    parser.add_argument("--dry-run", action="store_true")
    args = parser.parse_args()
    repo = Path(args.repo).expanduser().resolve()
    if not (repo / ".git").is_dir():
        raise SystemExit(f"not a git repository: {repo}")

    previous = ""
    changed_at: float | None = None
    log(f"watching {repo}")
    while True:
        current = status(repo)
        if current != previous:
            previous = current
            changed_at = time.monotonic()
            if current:
                log("检测到内容变更，等待防抖")
        if changed_at is not None and time.monotonic() - changed_at >= args.debounce:
            sync_once(repo, dry_run=args.dry_run)
            changed_at = None
            previous = status(repo)
        elif has_pending_commit(repo):
            sync_once(repo, dry_run=args.dry_run)
        time.sleep(args.interval)


if __name__ == "__main__":
    main()
