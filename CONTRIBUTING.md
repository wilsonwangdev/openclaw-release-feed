# 贡献指南

感谢你关注 OpenClaw 更新快讯项目！欢迎提交 Issue 和 Pull Request。

## 🤝 如何贡献

### 报告 Bug

发现 Bug？请提交 [GitHub Issue](https://github.com/wilsonwangdev/openclaw-release-feed/issues)，包含：

- 问题描述
- 复现步骤
- 预期行为 vs 实际行为
- 环境信息（浏览器、Node 版本等）
- 截图（如有）

### 提交代码

1. **Fork 本仓库**
2. **创建特性分支**
   ```bash
   git checkout -b feature/your-feature
   # 或修复分支
   git checkout -b fix/issue-number
   ```
3. **编写代码** 并确保通过测试
4. **提交** （使用语义化提交信息）
   ```bash
   git commit -m 'feat: 添加新功能'
   ```
5. **推送** 到你的 Fork
   ```bash
   git push origin feature/your-feature
   ```
6. **创建 Pull Request**

### Pull Request 规范

- ✅ PR 标题清晰描述改动
- ✅ 关联相关 Issue（如有）
- ✅ 包含测试或截图
- ✅ 更新相关文档
- ✅ 通过 CI 检查

## 🐛 当前关注的问题

### 高优先级

- [ ] 改进翻译质量（部分翻译不够通顺）
- [ ] 增加更多分类维度
- [ ] 支持多语言切换

### 中优先级

- [ ] 添加暗色/亮色主题切换
- [ ] 优化移动端体验
- [ ] 增加搜索功能

### 低优先级

- [ ] 添加 changelog 导出功能
- [ ] 支持 RSS 订阅
- [ ] 添加分享功能

## 📝 代码规范

### React 组件

```jsx
// ✅ 推荐：函数组件 + 解构 props
function ChangeItem({ title, link, type }) {
  return (
    <div className="p-4 rounded-lg">
      <span className={getTypeColor(type)}>{type.label}</span>
      <p>{title}</p>
    </div>
  )
}

// ❌ 避免：类组件
class ChangeItem extends React.Component {
  render() { ... }
}
```

### CSS 样式

```jsx
// ✅ 推荐：Tailwind 原子类
<div className="p-4 bg-white rounded-lg shadow-md">

// ❌ 避免：内联样式
<div style={{ padding: '16px', backgroundColor: 'white' }}>

// ⚠️ 复杂样式可在 index.css 中定义
<div className="custom-card">
```

### 翻译规则

```javascript
// ✅ 推荐：完整的词组翻译
'openrouter/auto': 'OpenRouter 自动',

// ❌ 避免：部分匹配
'auto': '自动',  // 可能导致误翻译
```

## 🧪 测试

```bash
# 本地测试数据同步
node scripts/generate-data.js

# 构建测试
npm run build

# 预览
npm run preview
```

## 📚 资源链接

- [React 文档](https://react.dev)
- [Tailwind CSS 文档](https://tailwindcss.com)
- [Vite 指南](https://vitejs.dev)
- [GitHub Actions 教程](https://docs.github.com/actions)

---

再次感谢你的贡献！ 💜
