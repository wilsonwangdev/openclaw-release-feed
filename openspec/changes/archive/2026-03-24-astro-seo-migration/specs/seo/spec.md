# SEO 规格说明

## 目的

定义 Astro 迁移必须满足的 SEO 要求，确保站点能被所有搜索引擎完全发现，并在社交平台分享时展示良好的预览效果。

## 需求

### 需求：静态 HTML 输出

构建过程必须生成包含完整版本发布内容的 HTML 页面，无需执行 JavaScript 即可显示内容。

#### 场景：爬虫访问页面

- 假设：搜索引擎爬虫请求页面
- 当：爬虫收到 HTML 响应
- 则：响应包含完整的版本标题、版本号、变更描述和分类标签，作为可读文本存在于 HTML body 中

#### 场景：JavaScript 被禁用

- 假设：用户在禁用 JavaScript 的状态下访问
- 当：页面加载完成
- 则：noscript 回退内容至少显示最新版本的信息

### 需求：搜索引擎 Meta 标签

页面必须在 `<head>` 元素中包含标准 SEO meta 标签。

#### 场景：搜索引擎索引

- 假设：页面 HTML 被解析
- 则：包含 `<title>` 标签，内容为"OpenClaw 更新快讯"
- 且：包含 `<meta name="description">`，描述内容为中文
- 且：包含 `<link rel="canonical">` 指向生产环境 URL
- 且：`<html lang="zh-CN">` 用于语言标识

### 需求：Open Graph 标签

页面必须包含 Open Graph 协议的 meta 标签以支持社交分享预览。

#### 场景：在微信/Twitter/Discord 分享

- 假设：用户分享页面 URL
- 当：平台获取 Open Graph 元数据
- 则：能找到 `og:title`、`og:description`、`og:type`、`og:url`、`og:image` 和 `og:locale` 标签

### 需求：Twitter Card 标签

页面必须包含 Twitter Card meta 标签。

#### 场景：在 Twitter/X 分享

- 假设：用户在 Twitter 上分享 URL
- 当：Twitter 渲染卡片
- 则：显示包含标题、描述和图片的摘要卡片，数据来自 `twitter:card`、`twitter:title`、`twitter:description`、`twitter:image` 标签

### 需求：JSON-LD 结构化数据

页面必须包含 JSON-LD 结构化数据以支持富文本搜索结果。

#### 场景：Google 富文本结果

- 假设：Google 解析页面
- 当：处理 JSON-LD script 标签
- 则：找到有效的 `WebSite` schema，包含 name、url、description 和 inLanguage 字段

### 需求：Sitemap

构建过程必须生成 sitemap XML 文件。

#### 场景：爬虫发现 sitemap

- 假设：爬虫读取 robots.txt
- 当：爬虫跟随 Sitemap 指令
- 则：找到列出站点 URL 的有效 XML sitemap

### 需求：robots.txt

站点必须在根路径提供 robots.txt 文件。

#### 场景：爬虫读取 robots.txt

- 假设：爬虫请求 /robots.txt
- 则：收到有效的 robots.txt，允许所有爬虫访问
- 且：包含指向 sitemap URL 的 Sitemap 指令

### 需求：语义化 HTML

页面必须使用语义化 HTML5 元素构建内容结构。

#### 场景：无障碍审计

- 假设：页面被无障碍工具分析
- 则：正确使用了 `<header>`、`<main>`、`<footer>`、`<nav>`、`<article>` 和 `<section>` 元素
- 且：交互元素具有适当的 `aria-label` 属性
