---
title: "本站内容工作流"
description: "本地 CMS、自动同步与 GitHub Pages 发布流程。"
pubDatetime: 2026-08-31
tags: ["workflow", "astro", "github"]
draft: false
---

本站使用本地 Sveltia CMS 编辑内容。保存后，macOS 后台同步服务会在短暂防抖后自动提交并推送内容文件。

网络不可用时，变更保留在本地；网络恢复后同步服务会自动重试。公开页面由 GitHub Actions 构建并部署到 GitHub Pages。
