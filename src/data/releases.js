// 翻译映射表 - 将英文关键词翻译为中文
const translations = {
  // 修复类
  fix: '修复',
  fixes: '修复',
  fixed: '已修复',

  // 功能类
  feat: '新增功能',
  feature: '功能',
  features: '新增',

  // 改进类
  improve: '改进',
  improvement: '改进',
  improvements: '改进',
  enhance: '增强',
  enhancement: '增强',
  update: '更新',
  updated: '已更新',

  // 安全类
  security: '安全',

  // Breaking
  breaking: '破坏性变更',
  'breaking change': '破坏性变更',

  // 组件
  browser: '浏览器',
  chrome: 'Chrome',
  'browser/cdp': '浏览器/CDP',
  'chrome mcp': 'Chrome MCP',
  mcp: 'MCP协议',

  // 平台/渠道
  discord: 'Discord',
  slack: 'Slack',
  telegram: 'Telegram',
  whatsapp: 'WhatsApp',
  feishu: '飞书',
  signal: 'Signal',

  // 核心功能
  gateway: '网关',
  model: '模型',
  models: '模型',
  agent: 'Agent',
  agents: 'Agent',
  plugins: '插件',
  plugin: '插件',
  config: '配置',
  voice: '语音',
  webhook: 'Webhook',

  // OAuth/认证
  oauth: 'OAuth认证',
  auth: '认证',
  authentication: '认证',
  token: '令牌',

  // API/服务
  openai: 'OpenAI',
  openrouter: 'OpenRouter',
  anthropic: 'Anthropic',
  mistral: 'Mistral',
  minimax: 'MiniMax',

  // 其他
  codex: 'Codex',
  doctor: '诊断工具',
  clawhub: 'ClawHub',
  github: 'GitHub',
  linux: 'Linux',
  macos: 'macOS',
  windows: 'Windows',
  proxy: '代理',
  timeout: '超时',
  error: '错误',
  crash: '崩溃',
  performance: '性能',
  memory: '内存',
  api: 'API',
  cli: 'CLI',
  ui: '界面',

  // 常用动词
  add: '添加',
  remove: '移除',
  change: '更改',
  support: '支持',
  prevent: '防止',
  avoid: '避免',
  optimize: '优化',
  enable: '启用',
  disable: '禁用',
  allow: '允许',
  stop: '停止',
  start: '开始',
  use: '使用',
  reuse: '复用',
  ensure: '确保',
  preserve: '保留',
  handle: '处理',
  resolve: '解决',
  retry: '重试',

  // 状态
  now: '现在',
  again: '重新',
  'again.': '重新',
  correctly: '正确地',
  successfully: '成功地',
  properly: '正确地',
  silently: '静默地',

  // 问题描述
  issue: '问题',
  regression: '回归问题',
  bug: 'Bug',
  failure: '失败',
  empty: '空',

  // 数据
  data: '数据',
  cache: '缓存',
  storage: '存储',
  file: '文件',
  image: '图片',
  text: '文本',

  // 网络
  network: '网络',
  request: '请求',
  response: '响应',
  connection: '连接',
  session: '会话',

  // 其他名词
  tool: '工具',
  command: '命令',
  path: '路径',
  setting: '设置',
  option: '选项',
  flag: '标志',
  key: '密钥',
  id: '标识符',
  name: '名称',
  type: '类型',
  value: '值',

  // 常用介词/连词
  from: '从',
  into: '进入',
  with: '使用',
  without: '不适用',
  instead: '而不是',
  when: '当',
  after: '之后',
  before: '之前',
  during: '期间',
  between: '之间',
  for: '为了',
  to: '到',
  of: '的',
  in: '在',
  on: '在',
  at: '在',
  by: '通过',
  so: '因此',
  and: '和',
  or: '或',
  but: '但是',

  // 常见句式
  'instead of': '而不是',
  'so that': '以便',
  'in order to': '为了',
  'thanks to': '感谢',
  'related to': '相关',
  'based on': '基于',
  'according to': '根据',
}

// 分类规则
const categoryRules = [
  { keywords: ['browser', 'chrome', 'cdp', 'mcp'], category: 'browser', label: '🌐 浏览器支持' },
  {
    keywords: [
      'discord',
      'slack',
      'telegram',
      'whatsapp',
      'feishu',
      'signal',
      'message',
      'channel',
    ],
    category: 'channels',
    label: '💬 消息渠道',
  },
  {
    keywords: ['github', 'actions', 'ci', 'deploy', 'workflow'],
    category: 'ci',
    label: '🔄 CI/CD',
  },
  {
    keywords: ['plugin', 'skill', 'clawhub', 'install'],
    category: 'plugins',
    label: '🧩 插件/技能',
  },
  {
    keywords: [
      'model',
      'openai',
      'openrouter',
      'anthropic',
      'mistral',
      'minimax',
      'codex',
      'pricing',
      'oauth',
      'token',
    ],
    category: 'models',
    label: '🤖 模型集成',
  },
  {
    keywords: ['agent', 'subagent', 'worker', 'runtime'],
    category: 'agents',
    label: '🤖 Agent系统',
  },
  {
    keywords: ['voice', 'call', 'phone', 'plivo', 'audio', 'tts', 'speech'],
    category: 'voice',
    label: '📞 语音通话',
  },
  {
    keywords: ['gateway', 'server', 'config', 'doctor', 'diagnos'],
    category: 'core',
    label: '⚙️ 核心系统',
  },
  {
    keywords: ['webhook', 'api', 'rest', 'http', 'request'],
    category: 'api',
    label: '🔌 API/接口',
  },
  {
    keywords: ['security', 'auth', 'permission', 'safe'],
    category: 'security',
    label: '🔐 安全相关',
  },
  {
    keywords: ['performance', 'speed', 'fast', 'optimiz'],
    category: 'performance',
    label: '🚀 性能优化',
  },
  { keywords: ['memory', 'leak', 'cache', 'storage'], category: 'data', label: '💾 数据/缓存' },
  {
    keywords: ['linux', 'macos', 'windows', 'platform'],
    category: 'platform',
    label: '🖥️ 平台支持',
  },
  {
    keywords: ['proxy', 'network', 'connection', 'timeout', 'firewall'],
    category: 'network',
    label: '🌍 网络/代理',
  },
  {
    keywords: ['fix', 'fixes', 'fixed', 'bug', 'issue', 'error', 'crash', 'regression'],
    category: 'fixes',
    label: '🐛 Bug修复',
  },
]

/**
 * 将英文文本翻译为中文
 */
export function translateToChinese(text) {
  if (!text) return text

  let result = text

  // 按长度降序排列，避免短词替换影响长词
  const sortedTranslations = Object.entries(translations).sort((a, b) => b[0].length - a[0].length)

  for (const [en, zh] of sortedTranslations) {
    // 使用正则进行大小写不敏感匹配
    const regex = new RegExp(`\\b${en}\\b`, 'gi')
    result = result.replace(regex, (match) => {
      // 保持首字母大写
      if (match[0] === match[0].toUpperCase()) {
        return zh.charAt(0).toUpperCase() + zh.slice(1)
      }
      return zh
    })
  }

  return result
}

/**
 * 自动分类变更条目
 */
export function categorizeChange(text) {
  const lowerText = text.toLowerCase()

  for (const rule of categoryRules) {
    if (rule.keywords.some((keyword) => lowerText.includes(keyword))) {
      return { category: rule.category, label: rule.label }
    }
  }

  return { category: 'other', label: '📦 其他' }
}

/**
 * 判断变更类型
 */
export function getChangeType(text) {
  const lowerText = text.toLowerCase()

  if (lowerText.startsWith('fix') || lowerText.startsWith('fixed')) {
    return { type: 'fix', icon: '🐛', label: '修复' }
  }
  if (lowerText.startsWith('feat') || lowerText.startsWith('new') || lowerText.startsWith('add')) {
    return { type: 'feat', icon: '✨', label: '新增' }
  }
  if (
    lowerText.startsWith('improve') ||
    lowerText.startsWith('enhance') ||
    lowerText.startsWith('update')
  ) {
    return { type: 'improve', icon: '⚡', label: '改进' }
  }
  if (lowerText.startsWith('security')) {
    return { type: 'security', icon: '🔒', label: '安全' }
  }
  if (lowerText.startsWith('breaking')) {
    return { type: 'breaking', icon: '⚠️', label: '注意' }
  }

  return { type: 'other', icon: '📝', label: '其他' }
}

/**
 * 解析 GitHub Release 原始数据
 */
export function parseReleaseData(rawData) {
  return rawData.map((release) => {
    // 解析 body（changelog）
    const lines = (release.body || release.body_html || '').split('\n').filter(Boolean)
    const changes = []
    let currentCategory = null

    for (const line of lines) {
      const trimmed = line.trim()

      // 跳过空行和标题
      if (!trimmed || trimmed.startsWith('#') || trimmed.startsWith('##')) {
        if (trimmed.includes('## ')) {
          currentCategory = trimmed.replace('## ', '').replace(/\s*$/, '')
        }
        continue
      }

      // 处理列表项
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const content = trimmed.replace(/^[-*]\s*/, '').trim()

        // 提取链接
        const linkMatch = content.match(/\[([^\]]+)\]\(([^)]+)\)/)
        let title = content
        let link = null

        if (linkMatch) {
          title = linkMatch[1]
          link = linkMatch[2]
        }

        changes.push({
          title: translateToChinese(title),
          rawTitle: title,
          link,
          category: currentCategory || categorizeChange(title).category,
          categoryLabel: currentCategory || categorizeChange(title).label,
          type: getChangeType(title),
        })
      }
    }

    return {
      id: release.id,
      tagName: release.tag_name,
      name: release.name || release.tag_name,
      htmlUrl: release.html_url,
      publishedAt: release.published_at,
      author: {
        name: release.author?.login || 'Unknown',
        avatar: release.author?.avatar_url,
        url: release.author?.html_url,
      },
      isPrerelease: release.prerelease,
      isDraft: release.draft,
      changes,
      changesByCategory: groupByCategory(changes),
    }
  })
}

/**
 * 按分类分组
 */
function groupByCategory(changes) {
  const groups = {}

  for (const change of changes) {
    const key = change.category
    if (!groups[key]) {
      groups[key] = {
        label: change.categoryLabel,
        items: [],
      }
    }
    groups[key].items.push(change)
  }

  return groups
}

/**
 * 格式化日期
 */
export function formatDate(dateString, locale = 'zh-CN') {
  const date = new Date(dateString)
  const now = new Date()
  const diffMs = now - date
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24))

  if (diffDays === 0) {
    return '今天'
  } else if (diffDays === 1) {
    return '昨天'
  } else if (diffDays < 7) {
    return `${diffDays} 天前`
  } else if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7)
    return `${weeks} 周前`
  } else {
    return date.toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }
}

/**
 * 格式化完整日期时间
 */
export function formatDateTime(dateString, locale = 'zh-CN') {
  const date = new Date(dateString)
  return date.toLocaleString(locale, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })
}
