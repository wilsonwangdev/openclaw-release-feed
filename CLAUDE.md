# CLAUDE.md - AI 开发助手配置

> 本文件为 AI 助手提供项目上下文和开发指南。AI 在处理本项目时应自动加载此文件。

## 项目概述

**OpenClaw 更新快讯** - 一个展示 OpenClaw 最新版本发布的 Web 应用。

- **仓库**: https://github.com/wilsonwangdev/openclaw-release-feed
- **技术栈**: React 18 + Vite 5 + Tailwind CSS 3.4
- **数据来源**: GitHub REST API (openclaw/openclaw releases)
- **部署**: Vercel / GitHub Pages

---

## 项目架构

```
openclaw-release-feed/
├── .github/workflows/
│   └── update-releases.yml    # 自动同步 Releases
├── web/                        # 前端应用
│   ├── src/
│   │   ├── App.jsx            # 主组件（版本选择、变更列表、分类筛选）
│   │   ├── main.jsx           # React 入口
│   │   ├── index.css          # Tailwind 样式
│   │   └── data/
│   │       ├── releases.js    # ⭐ 核心：翻译 + 分类逻辑
│   │       ├── releases.json   # 同步的 Release 数据
│   │       └── sample-data.js  # 示例数据
│   └── scripts/
│       └── generate-data.js   # CI 数据抓取脚本
└── vercel.json                # Vercel 部署配置
```

---

## 核心模块说明

### 1. releases.js - 翻译与分类引擎

这是项目的**核心模块**，包含：

```javascript
// 翻译映射表 - 英文关键词 → 中文
const translations = {
  'fix': '修复',
  'browser': '浏览器',
  // ...
}

// 分类规则 - 关键词匹配 → 分类标签
const categoryRules = [
  { keywords: ['browser', 'chrome'], category: 'browser', label: '🌐 浏览器支持' },
  // ...
]

// 核心函数
translateToChinese(text)    // 翻译英文文本
categorizeChange(text)       // 自动分类
getChangeType(text)          // 判断变更类型（fix/feat/improve）
parseReleaseData(rawData)    // 解析 GitHub Release 数据
formatDate(dateString)       // 格式化相对时间
```

### 2. App.jsx - 前端组件

主要功能：
- 版本选择器（切换不同 Release）
- 分类筛选（按模块筛选变更）
- 变更列表展示
- 按模块折叠面板

状态管理（React useState）：
```javascript
const [selectedVersion, setSelectedVersion] = useState(0)  // 当前版本索引
const [expandedCategories, setExpandedCategories] = useState({})  // 折叠状态
const [activeFilter, setActiveFilter] = useState('all')  // 分类筛选
```

### 3. generate-data.js - CI 数据脚本

由 GitHub Actions 调用：
1. 调用 GitHub API 获取 releases
2. 调用 `parseReleaseData()` 处理数据
3. 写入 `src/data/releases.json`

---

## 常用命令

```bash
# 开发
cd web && npm install    # 安装依赖
npm run dev               # 启动开发服务器 (localhost:5173)
npm run build             # 构建生产版本
npm run preview           # 预览生产构建

# 测试数据同步
node scripts/generate-data.js
```

---

## 开发规范

### 代码风格

- **React**: 使用函数组件 + Hooks
- **CSS**: Tailwind CSS 原子类为主，复杂样式用 `index.css`
- **命名**: 组件用 PascalCase，函数用 camelCase
- **注释**: 关键逻辑添加中文注释

### Git 提交规范

```
feat: 新功能
fix: 修复 bug
docs: 文档更新
style: 代码格式（不影响功能）
refactor: 重构
perf: 性能优化
test: 测试
chore: 构建/工具
```

### 分支命名

```
main                 # 主分支（生产）
feature/xxx          # 功能分支
fix/xxx              # 修复分支
docs/xxx             # 文档分支
```

---

## 扩展指南

### 添加新的分类

在 `releases.js` 的 `categoryRules` 中添加：

```javascript
{
  keywords: ['keyword1', 'keyword2'],
  category: 'new-category',
  label: '🎯 新分类'
}
```

### 添加新的翻译规则

在 `releases.js` 的 `translations` 中添加：

```javascript
'english_word': '中文翻译',
```

### 添加新页面/路由

当前为单页应用，如需多页面：

1. 创建新组件（如 `About.jsx`）
2. 使用 React Router:

```bash
npm install react-router-dom
```

```jsx
// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import About from './pages/About'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </BrowserRouter>
  )
}
```

### 添加动画效果

使用 Tailwind 动画类：

```jsx
<div className="animate-fade-in animate-bounce">
  内容
</div>
```

可用动画：`animate-fade-in`, `animate-pulse`, `animate-spin`, `animate-bounce`

---

## 故障排查

### 构建失败

```bash
# 清理缓存重试
rm -rf web/node_modules web/dist
cd web && npm install && npm run build
```

### API 限流

```bash
# 设置 GitHub Token
export GITHUB_TOKEN=ghp_xxxx

# 或在 .env 文件中
echo "GITHUB_TOKEN=ghp_xxxx" > web/.env
```

### 样式不生效

```bash
# 确保 Tailwind 构建正常
cd web
npx tailwindcss -i ./src/index.css -o ./src/index.css --watch
```

---

## 联系与反馈

- **GitHub Issues**: https://github.com/wilsonwangdev/openclaw-release-feed/issues
- **OpenClaw 社区**: https://discord.com/invite/clawd

---

*本文件由 AI 自动生成，最后更新: 2026-03-24*
