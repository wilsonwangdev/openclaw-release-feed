# OpenClaw 更新快讯

> 实时追踪 OpenClaw 最新版本发布，中文友好界面

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
[![GitHub Stars](https://img.shields.io/github/stars/wilsonwangdev/openclaw-release-feed)](https://github.com/wilsonwangdev/openclaw-release-feed)

## 功能特性

- **实时同步** - GitHub Actions 每日自动抓取最新 Releases
- **中文翻译** - 自动将英文变更说明翻译整理为中文
- **智能分类** - 按模块自动分类（浏览器支持、消息渠道、模型集成等）
- **版本时间线** - 多版本切换，查看历史更新
- **原文链接** - 每个变更可跳转 GitHub 查看详情
- **响应式设计** - 支持移动端浏览
- **SEO 优化** - 静态 HTML 输出，支持搜索引擎索引和社交分享预览

## 技术栈

| 类别     | 技术                             |
| -------- | -------------------------------- |
| 站点框架 | Astro 5（SSG 静态生成）          |
| 交互组件 | React 18（岛屿架构）             |
| 样式方案 | Tailwind CSS 3.4                 |
| 图标库   | Lucide React                     |
| 代码检查 | oxlint + oxfmt                   |
| 包管理器 | pnpm                             |
| 持续集成 | GitHub Actions                   |
| 部署平台 | Vercel                           |
| 数据来源 | GitHub REST API                  |

## 架构说明

本项目采用 **Astro 岛屿架构（Island Architecture）**：

- **静态部分**（Header、Footer、SEO 标签）在构建时渲染为纯 HTML，零 JavaScript 开销
- **交互部分**（版本选择器、分类筛选、折叠面板）作为 React 岛屿在客户端水合
- 构建输出为完整的静态 HTML，搜索引擎可直接读取全部内容

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

### 数据流

```
GitHub API ──→ generate-data.js ──→ releases.json ──→ Astro 构建 ──→ 静态 HTML
（CI 抓取）     （翻译 + 分类）      （提交到仓库）     （SSG 渲染）    （部署到 Vercel）
```

## SEO 特性

本站针对搜索引擎优化做了全面配置：

| 特性           | 说明                                                       |
| -------------- | ---------------------------------------------------------- |
| 静态 HTML      | 构建时生成完整页面内容，所有搜索引擎可直接读取             |
| Open Graph     | 支持微信、Discord 等平台的社交分享预览                     |
| Twitter Card   | 支持 Twitter/X 的摘要卡片展示                              |
| JSON-LD        | Schema.org 结构化数据，支持 Google 富文本搜索结果          |
| Sitemap        | 自动生成 sitemap-index.xml                                 |
| robots.txt     | 搜索引擎爬取指引                                           |
| Canonical URL  | 规范链接标签，防止重复内容                                 |
| 语义化 HTML    | 正确使用 header/main/footer/nav/article/section 标签       |
| 无障碍支持     | aria-label 属性提升屏幕阅读器体验                          |
| Noscript 回退  | 禁用 JS 时仍可查看最新版本信息                             |

## 快速开始

### 前置要求

- Node.js 20+
- pnpm 10+

### 安装依赖

```bash
pnpm install
```

### 本地开发

```bash
# 启动开发服务器（热重载）
pnpm dev

# 访问 http://localhost:4321
```

### 构建生产版本

```bash
# 构建
pnpm build

# 预览生产构建
pnpm preview
```

### 代码检查

```bash
# 检查代码规范
pnpm lint

# 自动修复
pnpm lint:fix

# 格式化代码
pnpm fmt

# 检查格式
pnpm fmt:check

# 一键检查
pnpm check
```

## 项目结构

```
openclaw-release-feed/
├── src/
│   ├── layouts/
│   │   └── Layout.astro          # 基础布局（SEO head、字体、全局样式）
│   ├── pages/
│   │   └── index.astro           # 主页面（静态渲染 + React 岛屿）
│   ├── components/
│   │   ├── SEOHead.astro         # SEO 标签（OG、Twitter Card、JSON-LD）
│   │   ├── Header.astro          # 静态头部导航（零 JS）
│   │   ├── Footer.astro          # 静态底部信息（零 JS）
│   │   └── ReleaseFeed.jsx       # React 岛屿（版本切换、筛选、列表）
│   ├── data/
│   │   ├── releases.js           # 翻译 + 分类引擎
│   │   ├── releases.json         # 同步的 Release 数据
│   │   └── sample-data.js        # 示例兜底数据
│   └── index.css                 # 全局样式 + Tailwind
├── scripts/
│   └── generate-data.js          # CI 数据抓取脚本
├── public/
│   ├── favicon.svg
│   └── robots.txt                # 搜索引擎爬取指引
├── openspec/                     # OpenSpec 变更管理
│   ├── config.yaml
│   └── changes/                  # 架构变更记录
├── astro.config.mjs              # Astro 配置
├── tailwind.config.js            # Tailwind 配置
├── package.json
└── vercel.json                   # Vercel 部署配置
```

## 数据同步流程

```
┌─────────────────┐
│  GitHub Actions  │
│  (每日 UTC 01:00)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub API      │
│  /repos/releases │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  generate-data   │
│  翻译 + 分类     │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  releases.json   │
│  提交到仓库      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel          │
│  自动构建部署    │
└─────────────────┘
```

### 手动触发同步

1. 访问仓库的 [Actions](https://github.com/wilsonwangdev/openclaw-release-feed/actions) 页面
2. 选择 "Update OpenClaw Releases" workflow
3. 点击 "Run workflow" → "Run workflow"

### 本地测试数据同步

```bash
node scripts/generate-data.js
```

需要配置 GitHub Token（避免 API 限流）：

```bash
export GITHUB_TOKEN=your_github_pat_here
node scripts/generate-data.js
```

## 部署

### Vercel 部署（推荐）

1. Fork 或导入本仓库到 GitHub
2. 访问 [vercel.com/new](https://vercel.com/new)
3. 导入 `openclaw-release-feed` 仓库
4. Framework Preset 选择 "Astro"
5. Build Command: `pnpm build`
6. Output Directory: `dist`
7. 点击 Deploy

**环境变量（可选）：**

| 变量           | 说明                                         | 必要性 |
| -------------- | -------------------------------------------- | ------ |
| `GITHUB_TOKEN` | GitHub Personal Access Token，避免 API 限流  | 推荐   |

## 自定义

### 修改翻译规则

编辑 `src/data/releases.js` 中的 `translations` 对象：

```javascript
const translations = {
  fix: '修复',
  browser: '浏览器',
  // 添加更多...
}
```

### 修改分类规则

编辑 `categoryRules` 数组：

```javascript
const categoryRules = [
  {
    keywords: ['browser', 'chrome'],
    category: 'browser',
    label: '🌐 浏览器支持',
  },
  // 添加更多分类...
]
```

### 修改主题颜色

编辑 `tailwind.config.js` 中的 `colors.brand`：

```javascript
colors: {
  brand: {
    500: '#d946ef',
    600: '#c026d3',
  }
}
```

## 变更历史

本项目使用 [OpenSpec](https://openspec.dev/) 管理架构级变更记录。

- 查看当前进行中的变更：`openspec/changes/`
- 查看已归档的历史变更：`openspec/changes/archive/`

每次重大架构变更都会通过 OpenSpec 记录动机、技术设计和实施过程，方便协作者了解项目演进历史。

## 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交改动：`git commit -m 'feat: xxx'`
4. 推送分支：`git push origin feature/xxx`
5. 创建 Pull Request

## 许可证

MIT License

## 致谢

- [OpenClaw](https://github.com/openclaw/openclaw) - 强大的 AI Agent 框架
- [Astro](https://astro.build) - 高性能静态站点生成器
- [Vercel](https://vercel.com) - 免费托管静态站点
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架
- [OpenSpec](https://openspec.dev/) - 轻量级变更管理框架

---

*由 OpenClaw AI 辅助构建 · 2026*
