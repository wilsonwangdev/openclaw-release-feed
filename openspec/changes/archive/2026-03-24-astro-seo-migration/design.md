# 技术设计：Astro SSG 迁移

## 架构方案：岛屿架构

Astro 的岛屿架构将页面分为静态 HTML（构建时渲染）和交互式"岛屿"（客户端水合）。这非常适合本项目：大部分内容是静态的版本发布数据，交互仅限于版本切换、分类筛选和折叠面板。

```
┌─────────────────────────────────────┐
│  静态 HTML（Astro，构建时渲染）        │
│  ┌──────────────────────────────┐   │
│  │  Header.astro（零 JS）       │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  ReleaseFeed.jsx             │   │
│  │  （React 岛屿，client:load） │   │
│  │  - 版本选择器                 │   │
│  │  - 分类筛选                   │   │
│  │  - 变更列表                   │   │
│  │  - 折叠面板                   │   │
│  └──────────────────────────────┘   │
│  ┌──────────────────────────────┐   │
│  │  Footer.astro（零 JS）       │   │
│  └──────────────────────────────┘   │
└─────────────────────────────────────┘
```

## 关键决策

### 1. 单个 React 岛屿 vs. 多个岛屿

**决策**：使用单个 `ReleaseFeed.jsx` 岛屿包含所有交互元素。

**理由**：版本选择器、筛选器和变更列表共享状态。拆分为多个岛屿需要共享状态机制（如 nanostores），会增加复杂度，对单页站点没有实质性的性能收益。

### 2. `client:load` vs. `client:visible`

**决策**：对 ReleaseFeed 岛屿使用 `client:load`。

**理由**：版本信息流是首屏的主要内容，用户期望立即可交互。`client:visible` 会延迟水合到滚动可见时，但信息流在加载时就已经可见。

### 3. Tailwind CSS 集成

**决策**：使用 `@astrojs/tailwind` 集成代替手动 PostCSS 配置。

**理由**：Astro 集成自动处理 PostCSS 配置，减少配置文件。现有的 Tailwind 类名和 `index.css` 保持不变。

### 4. 构建时数据流

**决策**：从 Astro 页面导入 `releases.json`，通过 props 传递给 React 岛屿。

```
releases.json → index.astro（import）→ <ReleaseFeed releases={data} client:load />
```

**理由**：Astro 可以在构建时导入 JSON。通过 props 传递让 React 组件保持为纯客户端组件，无需构建时依赖。

### 5. SEO 组件结构

**决策**：独立的 `SEOHead.astro` 组件，在 `Layout.astro` 中引用。

**理由**：将 SEO 关注点隔离，如果后续添加更多页面可以复用。

### 6. Noscript 回退

**决策**：在 `index.astro` 中包含 `<noscript>` 块，静态渲染第一个版本的基本信息。

**理由**：为不执行 JS 的爬虫提供内容，也提升了禁用 JS 用户的无障碍体验。

## 依赖变更

### 新增
- `astro` — 静态站点生成器
- `@astrojs/react` — React 岛屿集成
- `@astrojs/tailwind` — Tailwind CSS 集成
- `@astrojs/sitemap` — 自动 sitemap 生成

### 移除
- `@vitejs/plugin-react` — 被 @astrojs/react 取代
- `vite` — 被 Astro 内置的打包器取代（底层仍是 Vite）

### 不变
- `react`、`react-dom` — React 岛屿使用
- `lucide-react` — 图标库
- `@vercel/analytics` — 数据分析
- `tailwindcss`、`autoprefixer` — 样式处理
- `oxlint`、`oxfmt` — 代码检查与格式化
- `simple-git-hooks`、`lint-staged` — Git 钩子
