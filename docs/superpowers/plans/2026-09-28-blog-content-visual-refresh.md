# 博客内容与视觉增强实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 将个人博客的摘要内容扩写成长期可读文章，并为公开文章与笔记补充原创主题视觉。

**Architecture:** 保留 Astro 内容集合和现有来源字段，在 `public/visuals/` 中维护无外部依赖的 SVG 视觉资产；Markdown 正文在来源说明后引用视觉，文章页面无需新增运行时依赖。

**Tech Stack:** Astro 7、Markdown、Tailwind CSS、SVG、pnpm、GitHub Actions。

## Global Constraints

- 不修改 `/Users/kaima/Documents/Obsidian Vault/LinuxDo` 原始文件。
- 不发布 API key、token、密码、手机号、身份证、银行账户、真实邮箱、内网地址或可直接滥用的敏感操作步骤。
- 不整篇复制论坛内容；每篇保留来源、整理时间和个人判断。
- 主文章目标约 1,200–2,000 个中文字符，笔记目标约 600–1,000 个中文字符。
- 图片必须在构建后的站点中可访问，不能依赖本地绝对路径。

---

### Task 1: 建立主题视觉资产

**Files:**
- Create: `public/visuals/*.svg`
- Modify: `src/styles/global.css`

- [ ] 创建网络链路、AI 研究、Agent 架构、服务器基线、视频流水线、生活决策六组 SVG 图。
- [ ] 为图形统一圆角、线宽和深浅色模式下的对比度。
- [ ] 增加图片说明与移动端最大宽度样式。

### Task 2: 扩写主文章

**Files:**
- Modify: `src/content/posts/*.md`

- [ ] 为每篇文章补充背景、流程、失败路径、检查清单和个人判断。
- [ ] 在正文开头加入对应主题视觉和准确的 `alt` 文本。
- [ ] 保留来源字段，检查新增段落不包含原始私人信息或危险细节。

### Task 3: 扩写笔记与站点说明

**Files:**
- Modify: `src/content/notes/*.md`
- Modify: `README.md`

- [ ] 给笔记补充适用边界、复查时间和下一步行动。
- [ ] 更新 README 的媒体资源维护说明。

### Task 4: 验证与发布

**Files:**
- Modify: none unless validation finds an issue.

- [ ] 运行 `git diff --check`、Prettier、ESLint 和 `astro check`。
- [ ] 运行 `astro build` 与 Pagefind，确认图片引用没有 404。
- [ ] 扫描公开内容中的凭据和个人信息模式。
- [ ] 提交并推送到 `origin/main`，验证 GitHub Pages 返回 HTTP 200。
