# Smile232323 · Notes & Works

个人笔记、研究记录、简历与作品集，基于 Astro + AstroPaper 构建。

## 本地编辑

本项目集成了 [Sveltia CMS](https://github.com/sveltia/sveltia-cms) 的 Local Workflow。首次准备好依赖后，在项目目录运行：

```bash
pnpm dev
```

使用 Chrome、Edge 或 Chromium 版 Brave 打开（Safari/Firefox 不支持本地文件授权）：

```text
http://localhost:4321/admin/index.html
```

点击“使用本地仓库”并选择本项目根目录后，即可在网页中编辑文章、笔记、作品、论文、个人资料和简历。内容会直接写入 `src/content/`、`src/data/` 与 `public/uploads/`。

## 自动同步

安装本地服务（只需一次）：

```bash
./scripts/install_local_services.sh
```

安装后，macOS 会在登录时自动启动本地 Astro 服务和内容同步服务。同步服务会在内容修改停止 30 秒后自动提交并推送到 GitHub；网络不可用时会保留本地提交并自动重试。

自动同步只处理以下路径：

```text
src/content/
src/data/
public/uploads/
```

源码、依赖、构建产物和 `.env` 不会被自动提交。

## 网站发布

内容同步到 `main` 后，GitHub Actions 会构建静态网站并部署到 GitHub Pages：

<https://smile232323.github.io/personal-site/>

## 内容结构

```text
src/content/posts/          文章
src/content/notes/          笔记
src/content/projects/       作品
src/content/publications/   论文与报告
src/data/profile.yml        个人资料
src/content/pages/resume.md 简历页面（CMS 编辑入口）
public/admin/               本地 Sveltia CMS
scripts/                    本地服务与自动同步
```
