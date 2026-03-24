# OpenClaw 更新快讯

实时追踪 OpenClaw 最新版本发布，简体中文友好界面。

## 功能特性

- 🌐 实时展示 OpenClaw 最新 Release 信息
- 📝 自动将英文更新内容翻译整理为中文
- 🏷️ 按类型分类展示（新增功能 / Bug 修复 / 改进）
- 📅 版本时间线展示
- 🔗 直接跳转到 GitHub 阅读原文

## 技术栈

- **前端**：React + Vite + Tailwind CSS
- **部署**：GitHub Pages / Vercel
- **CI**：GitHub Actions 自动同步

## 快速开始

```bash
cd web
npm install
npm run dev
```

## 部署

### Vercel（推荐）

```bash
npm i -g vercel
vercel
```

### GitHub Pages

推送代码后，GitHub Actions 会自动部署。

## 数据来源

通过 GitHub API 获取 [openclaw/openclaw](https://github.com/openclaw/openclaw) 的 Releases 数据。

---

*由 OpenClaw AI 辅助构建*
