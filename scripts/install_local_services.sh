#!/usr/bin/env bash
set -euo pipefail

REPO_DIR="$(cd "$(dirname "$0")/.." && pwd)"
LAUNCH_DIR="$HOME/Library/LaunchAgents"
mkdir -p "$LAUNCH_DIR"

PYTHON_BIN="$(command -v python3)"
PNPM_BIN="$(command -v pnpm)"

cat > "$LAUNCH_DIR/com.smile232323.personal-site-sync.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.smile232323.personal-site-sync</string>
  <key>ProgramArguments</key><array>
    <string>$PYTHON_BIN</string><string>$REPO_DIR/scripts/auto_sync.py</string>
    <string>--repo</string><string>$REPO_DIR</string>
  </array>
  <key>WorkingDirectory</key><string>$REPO_DIR</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/personal-site-sync.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/personal-site-sync.err.log</string>
</dict></plist>
PLIST

cat > "$LAUNCH_DIR/com.smile232323.personal-site-dev.plist" <<PLIST
<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE plist PUBLIC "-//Apple//DTD PLIST 1.0//EN" "http://www.apple.com/DTDs/PropertyList-1.0.dtd">
<plist version="1.0"><dict>
  <key>Label</key><string>com.smile232323.personal-site-dev</string>
  <key>ProgramArguments</key><array>
    <string>$PNPM_BIN</string><string>dev</string><string>--host</string><string>127.0.0.1</string>
  </array>
  <key>WorkingDirectory</key><string>$REPO_DIR</string>
  <key>RunAtLoad</key><true/>
  <key>KeepAlive</key><true/>
  <key>StandardOutPath</key><string>$HOME/Library/Logs/personal-site-dev.log</string>
  <key>StandardErrorPath</key><string>$HOME/Library/Logs/personal-site-dev.err.log</string>
</dict></plist>
PLIST

mkdir -p "$HOME/Library/Logs"
launchctl bootout "gui/$(id -u)" "$LAUNCH_DIR/com.smile232323.personal-site-sync.plist" 2>/dev/null || true
launchctl bootout "gui/$(id -u)" "$LAUNCH_DIR/com.smile232323.personal-site-dev.plist" 2>/dev/null || true
launchctl bootstrap "gui/$(id -u)" "$LAUNCH_DIR/com.smile232323.personal-site-sync.plist"
launchctl bootstrap "gui/$(id -u)" "$LAUNCH_DIR/com.smile232323.personal-site-dev.plist"
echo "Local services installed. CMS: http://localhost:4321/admin/index.html"
