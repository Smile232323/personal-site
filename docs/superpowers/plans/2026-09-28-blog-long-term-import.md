# 博客长期维护与 LinuxDo 资料重构实施计划

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 修复个人博客的长期维护基础，并将 Obsidian 中可公开的 LinuxDo 技术与经验资料重写为带来源说明的博客内容。

**Architecture:** 保留 Obsidian 作为私人原始资料库，博客只接收去隐私、去敏感操作细节并重新组织后的公开文章。文章保留真实原始资料时间与整理时间，正式发布日期使用当前或未来排期，不伪造历史发表记录。站点继续使用 Astro 内容集合、GitHub Pages 和本地 Sveltia CMS。

**Tech Stack:** Astro 7、TypeScript、Astro Content Collections、Sveltia CMS、Pagefind、pnpm、GitHub Actions、Markdown。

## Global Constraints

- 不修改 `/Users/kaima/Documents/Obsidian Vault/LinuxDo` 原始文件。
- 不把 API key、token、密码、手机号、身份证、银行账户、真实内网地址或私人联系方式写入博客。
- 不发布可直接用于绕过 KYC、越狱、Hook、自动发消息或其他滥用行为的操作步骤。
- 社区资料不整篇复制；公开文章使用重写、摘要、个人判断和来源链接，并标注整理性质。
- 不使用伪造的历史博客发布时间；源资料时间与博客整理/发布时间分开记录。
- 每个内容批次完成后运行 `pnpm run lint`、`pnpm run build` 和必要的格式检查。

---

### Task 1: 修复站点维护基线

**Files:**
- Modify: `src/content.config.ts`
- Modify: `src/pages/notes/index.astro`
- Modify: `src/pages/projects/index.astro`
- Modify: `src/pages/search.astro`
- Modify: `src/pages/rss.xml.ts`
- Modify: `.github/workflows/ci.yml`
- Modify: `.github/workflows/deploy.yml`
- Modify: `astro-paper.config.ts`
- Create: `src/pages/publications/index.astro`
- Create: `src/pages/publications/[...slug].astro`

- [ ] 扩展文章和笔记 schema，支持 `source`、`sourceDate`、`curatedAt`、`sourceNote` 等可选来源字段。
- [ ] 让笔记和项目列表按日期或名称稳定排序。
- [ ] 为论文与报告增加列表页和详情页，过滤草稿并渲染正文。
- [ ] 让可公开内容页面带有 Pagefind 正文标记，保留导航和脚注为忽略区域。
- [ ] 保持 RSS 默认只发布正式文章，并过滤草稿和未来排期。
- [ ] 统一 CI 与部署的 Node/pnpm 主版本，并让 push 到 `main` 至少执行构建校验。
- [ ] 修复占位邮箱和站点公开配置中的明显占位信息。

### Task 2: 改善内容来源展示和本地编辑体验

**Files:**
- Modify: `src/pages/posts/[...slug]/index.astro`
- Modify: `src/layouts/PostLayout.astro` 或新增 `src/components/SourceNote.astro`
- Modify: `public/admin/index.html`
- Modify: `public/admin/config.yml`
- Modify: `scripts/install_local_services.sh`
- Modify: `README.md`

- [ ] 在文章正文前显示“原始资料时间、整理时间、来源说明”，不展示原始作者个人信息。
- [ ] 固定 Sveltia CMS 的可复现版本，避免 CDN 无版本漂移。
- [ ] 为媒体路径和 GitHub Pages 基路径补充明确说明。
- [ ] 修复或明确本地 Astro 服务和自动同步服务的启动方式，保留同步服务的离线重试能力。

### Task 3: 批量重构公开内容

**Files:**
- Create: `src/content/posts/*.md`
- Create: `src/content/notes/*.md`
- Create: `src/content/publications/*.md`（仅适合论文/报告类资料）

- [ ] 从 `LinuxDo/00-入口`、`LinuxDo/02-主题整理` 和 `LinuxDo/03-可复用方法` 建立候选清单。
- [ ] 优先重写 AI 与科研、Codex 与开发环境、服务器与网络、产品与 Skill、视频/TTS、项目部署等主题。
- [ ] 对生活、金融、身份、账号和社区争议内容只保留通用决策框架，删除可识别信息和具体敏感操作。
- [ ] 为每篇文章写新的标题、摘要、标签、结构化正文、来源链接、原始资料时间和整理时间。
- [ ] 正式内容使用 `draft: false`，尚需人工核对或事实过期的内容使用 `draft: true`。
- [ ] 使用当前日期及未来日期排期，形成持续发布队列，不倒填虚构博客历史。

### Task 4: 验证、审计与同步

**Files:**
- Modify: generated content only when validation finds an issue.

- [ ] 扫描新文章中的敏感字段、密钥样式、私人联系方式和论坛原始用户名。
- [ ] 运行 `pnpm run lint`、`pnpm run format:check`、`pnpm run build`。
- [ ] 检查构建页面数量、文章路由、论文路由、RSS 和 Pagefind 索引。
- [ ] 检查 `git diff`，确认没有 Obsidian 原始文件、构建产物或凭据进入博客仓库。
- [ ] 提交内容与站点修复，推送到 `origin/main`；若网络不可用，保留本地提交并说明。
