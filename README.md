# OpenClaw 更新快讯

> 🌐 实时追踪 OpenClaw 最新版本发布，中文友好界面

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone)
[![GitHub Stars](https://img.shields.io/github/stars/wilsonwangdev/openclaw-release-feed)](https://github.com/wilsonwangdev/openclaw-release-feed)

## ✨ 功能特性

- 📡 **实时同步** - GitHub Actions 每日自动抓取最新 Releases
- 🇨🇳 **中文翻译** - 自动将英文变更说明翻译整理为中文
- 🏷️ **智能分类** - 按模块自动分类（浏览器支持、消息渠道、模型集成等）
- 📅 **版本时间线** - 多版本切换，查看历史更新
- 🔗 **原文链接** - 每个变更可跳转 GitHub 查看详情
- 📱 **响应式设计** - 支持移动端浏览

## 🛠️ 技术栈

| 类别     | 技术                  |
| -------- | --------------------- |
| 前端框架 | React 18 + Vite 5     |
| 样式方案 | Tailwind CSS 3.4      |
| 图标库   | Lucide React          |
| 持续集成 | GitHub Actions        |
| 部署平台 | Vercel / GitHub Pages |
| 数据来源 | GitHub REST API       |

## 🚀 快速开始

### 前置要求

- Node.js 18+
- npm 9+ 或 pnpm 8+

### 安装依赖

```bash
npm install
```

### 本地开发

```bash
# 启动开发服务器（热重载）
npm run dev

# 访问 http://localhost:5173
```

### 构建生产版本

```bash
# 构建
npm run build

# 预览生产构建
npm run preview
```

### 项目结构

```
openclaw-release-feed/
├── src/
│   ├── App.jsx              # 主应用组件
│   ├── main.jsx            # React 入口
│   ├── index.css           # 全局样式 + Tailwind
│   └── data/
│       ├── releases.js     # 翻译 + 分类逻辑
│       ├── releases.json   # 同步的 Release 数据
│       └── sample-data.js  # 示例数据（无数据时兜底）
├── scripts/
│   └── generate-data.js    # GitHub Actions 数据抓取脚本
├── public/
│   └── favicon.svg
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## 🔄 数据同步流程

```
┌─────────────────┐
│  GitHub Actions │
│  (每日 UTC 01:00)│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  GitHub API     │
│  /repos/releases│
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  generate-data  │
│  翻译 + 分类    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│ releases.json   │
│ 提交到仓库      │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Vercel Pages   │
│  自动部署       │
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

## 🌐 部署

### Vercel 部署（推荐）

1. Fork 或导入本仓库到 GitHub
2. 访问 [vercel.com/new](https://vercel.com/new)
3. 导入 `openclaw-release-feed` 仓库
4. Framework Preset 选择 "Vite"
5. Build Command: `npm run build`
6. Output Directory: `dist`
7. 点击 Deploy！

**环境变量（可选）：**

| 变量           | 说明                                        | 必要性 |
| -------------- | ------------------------------------------- | ------ |
| `GITHUB_TOKEN` | GitHub Personal Access Token，避免 API 限流 | 推荐   |

### GitHub Pages 部署

1. 仓库 Settings → Pages
2. Source: GitHub Actions
3. Actions 会自动构建并部署 `dist` 目录

## 🎨 自定义

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
  { keywords: ['browser', 'chrome'], category: 'browser', label: '🌐 浏览器支持' },
  // 添加更多分类...
]
```

### 修改主题颜色

编辑 `tailwind.config.js` 中的 `colors.brand`：

```javascript
colors: {
  brand: {
    500: '#d946ef',  // 主色调
    600: '#c026d3',  // 悬停色
  }
}
```

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

1. Fork 本仓库
2. 创建特性分支：`git checkout -b feature/xxx`
3. 提交改动：`git commit -m 'feat: xxx'`
4. 推送分支：`git push origin feature/xxx`
5. 创建 Pull Request

## 📄 许可证

MIT License

## 🙏 致谢

- [OpenClaw](https://github.com/openclaw/openclaw) - 强大的 AI Agent 框架
- [Vercel](https://vercel.com) - 免费托管静态站点
- [Tailwind CSS](https://tailwindcss.com) - 实用优先的 CSS 框架

---

_由 OpenClaw AI 辅助构建 · 2026_
