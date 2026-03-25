# 实施任务清单

## 阶段一：项目配置

- [x] 安装 OpenSpec 并创建变更提案
- [x] 更新 package.json 依赖（新增 astro、@astrojs/react、@astrojs/tailwind、@astrojs/sitemap；移除 @vitejs/plugin-react、vite）
- [x] 创建 astro.config.mjs，配置 React、Tailwind、Sitemap 集成
- [x] 更新 tailwind.config.js 的 content 路径以包含 .astro 文件
- [x] 更新 lint-staged 配置以包含 .astro 文件

## 阶段二：Astro 布局与 SEO

- [x] 创建 src/layouts/Layout.astro，包含完整 HTML 结构、字体、全局 CSS
- [x] 创建 src/components/SEOHead.astro，包含 Open Graph、Twitter Card、JSON-LD
- [x] 验证：所有 meta 标签在构建后的 HTML 中正确渲染

## 阶段三：组件迁移

- [x] 创建 src/components/Header.astro（静态，从 App.jsx 头部提取）
- [x] 创建 src/components/Footer.astro（静态，从 App.jsx 底部提取）
- [x] 创建 src/components/ReleaseFeed.jsx（交互式，App.jsx 主体内容）
- [x] 创建 src/pages/index.astro，组合布局 + 组件 + noscript 回退
- [x] 应用语义化 HTML（nav、article、section）和 aria 属性

## 阶段四：基础设施

- [x] 添加 public/robots.txt 并引用 sitemap
- [x] 更新 vercel.json 的 framework 为 "astro"
- [x] 更新 .github/workflows/ci.yml
- [x] 删除废弃文件：vite.config.js、postcss.config.js、src/main.jsx、index.html、src/App.jsx

## 阶段五：文档

- [x] 更新 README.md，反映新架构、命令和 SEO 特性
- [x] 更新 CLAUDE.md 的项目架构章节

## 阶段六：验证

- [x] 执行 pnpm build 并验证 dist/index.html 包含完整静态内容
- [x] 验证 meta 标签（OG、Twitter、JSON-LD）
- [x] 验证 sitemap 生成
- [x] 验证 robots.txt 可访问
- [x] 归档本次 OpenSpec 变更记录
