# 提案：从 React/Vite SPA 迁移到 Astro SSG

## 概述

将 OpenClaw 更新快讯从客户端渲染的 React + Vite 单页应用迁移到 Astro 静态站点生成器 + React 岛屿架构，实现全面 SEO 优化，同时保留所有交互功能。

## 动机

当前 React SPA 完全在浏览器端渲染，构建后的 `index.html` 仅包含一个空的 `<div id="root"></div>`。搜索引擎爬虫（尤其是百度、必应、Yandex 等非 Google 引擎）看到的是空白页面。这意味着：

- **自然搜索曝光为零** — 用户搜索 OpenClaw 版本更新信息时无法找到本站
- **社交分享无预览** — 在微信、Twitter、Discord 分享链接时没有标题、描述和图片
- **缺少结构化数据** — 无法在搜索结果中展示富文本摘要
- **没有 robots.txt 和 sitemap** — 爬虫缺乏爬取指引
- **首屏加载依赖 JS** — 整个 JavaScript 包必须加载完成才能显示内容

## 目标

1. 构建时输出完整的静态 HTML，所有搜索引擎均可直接读取
2. 添加完整 SEO 元标签：Open Graph、Twitter Cards、JSON-LD 结构化数据
3. 自动生成 sitemap 和 robots.txt
4. 使用语义化 HTML 标签并添加无障碍属性
5. 保留所有交互功能（版本切换、分类筛选、折叠面板）
6. 通过岛屿架构减少客户端 JavaScript 负载

## 非目标

- 不新增页面或路由（保持单页站点）
- 不改变数据管道（releases.json 的生成方式不变）
- 不修改翻译/分类逻辑（releases.js 保持不变）
- 不重新设计 UI 或改变视觉外观
- 不使用服务端渲染（SSR）— 纯静态生成（SSG）即可满足需求

## 变更范围

### 被替换的文件

- `index.html` → `src/pages/index.astro`
- `src/main.jsx` → 移除（Astro 处理入口）
- `src/App.jsx` → 拆分为 `Header.astro` + `Footer.astro` + `ReleaseFeed.jsx`
- `vite.config.js` → `astro.config.mjs`
- `postcss.config.js` → 移除（由 @astrojs/tailwind 自动处理）

### 新增的文件

- `src/layouts/Layout.astro` — 基础 HTML 布局，包含 SEO head
- `src/components/SEOHead.astro` — Open Graph、Twitter Card、JSON-LD 标签
- `src/components/Header.astro` — 静态头部导航（零 JS）
- `src/components/Footer.astro` — 静态底部信息（零 JS）
- `src/components/ReleaseFeed.jsx` — React 岛屿，承载所有交互逻辑
- `public/robots.txt` — 搜索引擎爬取指引

### 不变的文件

- `src/data/releases.js` — 翻译与分类引擎
- `src/data/releases.json` — 同步的 Release 数据
- `src/data/sample-data.js` — 示例兜底数据
- `src/index.css` — Tailwind 样式
- `scripts/generate-data.js` — CI 数据抓取脚本

## 向后兼容

- 相同的 URL 结构（单一 `/` 路由）
- 相同的视觉设计和用户体验
- 相同的部署目标（Vercel）
- 相同的 CI/CD 管道（GitHub Actions 同步数据，Vercel 构建部署）
- `pnpm dev`、`pnpm build`、`pnpm preview` 命令继续可用（指向 Astro）
