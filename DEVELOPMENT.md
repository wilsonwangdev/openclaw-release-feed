# 开发指南

本文档提供 OpenClaw 更新快讯项目的详细开发信息。

## 🏗️ 环境配置

### 系统要求

| 软件    | 版本  | 说明                  |
| ------- | ----- | --------------------- |
| Node.js | 18+   | 推荐使用 nvm 管理版本 |
| npm     | 9+    | 或 pnpm 8+            |
| Git     | 2.30+ | 代码版本控制          |

### 安装 Node.js（推荐使用 nvm）

```bash
# 安装 nvm（如果还没有）
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash

# 安装 Node.js 18
nvm install 18
nvm use 18

# 验证
node --version  # 应该显示 v18.x.x
npm --version   # 应该显示 9.x.x
```

### 克隆并启动

```bash
# 克隆仓库
git clone https://github.com/wilsonwangdev/openclaw-release-feed.git
cd openclaw-release-feed

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

## 🔧 开发工作流

### 1. 修改翻译规则

翻译规则位于 `src/data/releases.js`：

```javascript
// 添加新的翻译映射
const translations = {
  // ... 现有翻译 ...
  new_keyword: '中文翻译',
}
```

**注意事项：**

- 优先翻译完整的词组（如 `'openai codex': 'OpenAI Codex'`）
- 避免单独翻译常用词（如 `'a'`, `'the'`）
- 保持首字母大写的正确性

### 2. 添加新分类

在 `categoryRules` 数组中添加：

```javascript
{
  keywords: ['keyword1', 'keyword2', 'partial'],  // 匹配规则
  category: 'unique-category-id',                  // 唯一标识
  label: '🎨 分类名称'                              // 显示标签
}
```

**匹配逻辑：**

- 使用 `includes()` 检查任意关键词匹配
- 关键词应足够具体以避免误分类
- 分类按 `categoryRules` 数组顺序匹配（前者优先）

### 3. 调试数据解析

```javascript
// 在 scripts/generate-data.js 中添加调试日志
console.log('原始数据:', release.body)
console.log('解析结果:', changes)
```

### 4. 测试不同分辨率

Vite 开发服务器支持响应式测试：

```bash
# 启动后，打开 DevTools
# 1. 按 Cmd+Option+I (Mac) / F12 (Windows)
# 2. 点击 Device Toolbar 图标
# 3. 选择不同设备或自定义尺寸
```

## 🧪 测试

### 单元测试（可选扩展）

建议安装 Vitest：

```bash
npm install -D vitest
```

创建测试文件：

```javascript
// src/__tests__/releases.test.js
import { describe, it, expect } from 'vitest'
import { translateToChinese, categorizeChange } from '../data/releases'

describe('翻译测试', () => {
  it('正确翻译 browser', () => {
    expect(translateToChinese('browser')).toBe('浏览器')
  })
})
```

### E2E 测试（可选扩展）

使用 Playwright：

```bash
npm install -D @playwright/test
npx playwright install
```

## 📦 构建优化

### 分析构建体积

```bash
# 使用 Vite 分析插件
npm install -D rollup-plugin-visualizer
```

### 优化 Tailwind CSS

```javascript
// tailwind.config.js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  // 启用 JIT 模式（默认）
  // 自动清理未使用的样式
}
```

### 启用 Gzip/Brotli 压缩

Vercel 默认支持，无需额外配置。

## 🚀 CI/CD

### GitHub Actions 工作流

位置：`.github/workflows/update-releases.yml`

```yaml
on:
  schedule:
    # 每天 UTC 01:00 (北京时间 09:00) 运行
    - cron: '0 1 * * *'
  workflow_dispatch: # 支持手动触发
```

### 手动触发同步

1. 访问仓库 Actions 页面
2. 选择 "Update OpenClaw Releases"
3. 点击 "Run workflow"

### 调试 CI 问题

```bash
# 本地模拟 CI 环境
node scripts/generate-data.js

# 检查输出
cat src/data/releases.json | jq '.'
```

## 🎨 UI/UX 开发

### 添加新组件

```bash
# 在 src/components/ 下创建
touch src/components/NewComponent.jsx
```

组件模板：

```jsx
import { useState } from 'react'

export default function NewComponent({ title, onAction }) {
  const [active, setActive] = useState(false)

  return (
    <div className="p-4 rounded-lg bg-white/5">
      <h3 className="text-lg font-semibold">{title}</h3>
      <button
        onClick={() => setActive(!active)}
        className="mt-2 px-4 py-2 rounded bg-brand-500 hover:bg-brand-600"
      >
        {active ? '激活' : '未激活'}
      </button>
    </div>
  )
}
```

### 使用图标

本项目使用 [Lucide React](https://lucide.dev)：

```jsx
import { Github, ExternalLink, Bug, Sparkles } from 'lucide-react'

// 使用示例
<Github className="w-5 h-5" />
<Sparkles className="w-4 h-4 text-yellow-400" />
```

### 添加动画

Tailwind 内置动画：

```jsx
// 淡入
<div className="animate-fade-in">

// 脉冲
<div className="animate-pulse">

// 旋转加载
<div className="animate-spin">

// 自定义动画（在 index.css 中定义）
<div className="animate-pulse-glow">
```

## 🔒 安全考虑

### 敏感信息

- **不要**在代码中硬编码 GitHub Token
- 使用环境变量：`.env` 文件（已加入 .gitignore）
- CI 中使用 GitHub Secrets

### CSP 配置

Vercel 默认配置足够安全。如需自定义，在 `vercel.json` 中配置。

## 📊 性能监控

### Lighthouse 评分目标

| 指标           | 目标分数 |
| -------------- | -------- |
| Performance    | ≥ 90     |
| Accessibility  | ≥ 90     |
| Best Practices | ≥ 90     |
| SEO            | ≥ 90     |

### 优化建议

1. **图片**: 使用 WebP 格式，添加 `loading="lazy"`
2. **代码分割**: React.lazy() 懒加载路由
3. **缓存**: 配置 Cache-Control 头

---

## 🆘 获得帮助

- 📖 查看 [README.md](./README.md)
- 🐛 报告问题 [GitHub Issues](https://github.com/wilsonwangdev/openclaw-release-feed/issues)
- 💬 加入讨论 [OpenClaw Discord](https://discord.com/invite/clawd)
