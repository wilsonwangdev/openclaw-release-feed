/**
 * 生成 releases.json 数据文件
 * 由 GitHub Actions 调用
 */

import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

// 翻译映射表 - 将英文关键词翻译为中文
const translations = {
  // 修复类
  'fix': '修复',
  'fixes': '修复',
  'fixed': '已修复',

  // 功能类
  'feat': '新增功能',
  'feature': '功能',
  'features': '新增',

  // 改进类
  'improve': '改进',
  'improvement': '改进',
  'improvements': '改进',
  'enhance': '增强',
  'enhancement': '增强',
  'update': '更新',
  'updated': '已更新',

  // 安全类
  'security': '安全',

  // Breaking
  'breaking': '破坏性变更',
  'breaking change': '破坏性变更',

  // 组件
  'browser': '浏览器',
  'chrome': 'Chrome',
  'browser/cdp': '浏览器/CDP',
  'chrome mcp': 'Chrome MCP',
  'mcp': 'MCP协议',

  // 平台/渠道
  'discord': 'Discord',
  'slack': 'Slack',
  'telegram': 'Telegram',
  'whatsapp': 'WhatsApp',
  'feishu': '飞书',
  'signal': 'Signal',

  // 核心功能
  'gateway': '网关',
  'model': '模型',
  'models': '模型',
  'agent': 'Agent',
  'agents': 'Agent',
  'plugins': '插件',
  'plugin': '插件',
  'config': '配置',
  'voice': '语音',
  'webhook': 'Webhook',

  // OAuth/认证
  'oauth': 'OAuth认证',
  'auth': '认证',
  'authentication': '认证',
  'token': '令牌',

  // API/服务
  'openai': 'OpenAI',
  'openrouter': 'OpenRouter',
  'anthropic': 'Anthropic',
  'mistral': 'Mistral',
  'minimax': 'MiniMax',

  // 其他
  'codex': 'Codex',
  'doctor': '诊断工具',
  'clawhub': 'ClawHub',
  'github': 'GitHub',
  'linux': 'Linux',
  'macos': 'macOS',
  'windows': 'Windows',
  'proxy': '代理',
  'timeout': '超时',
  'error': '错误',
  'crash': '崩溃',
  'performance': '性能',
  'memory': '内存',
  'api': 'API',
  'cli': 'CLI',
  'ui': '界面',

  // 常用动词
  'add': '添加',
  'remove': '移除',
  'change': '更改',
  'support': '支持',
  'prevent': '防止',
  'avoid': '避免',
  'optimize': '优化',
  'enable': '启用',
  'disable': '禁用',
  'allow': '允许',
  'stop': '停止',
  'reuse': '复用',
  'ensure': '确保',
  'preserve': '保留',
  'handle': '处理',
  'resolve': '解决',
  'retry': '重试',

  // 状态
  'now': '现在',
  'again': '重新',
  'correctly': '正确地',
  'successfully': '成功地',
  'properly': '正确地',
  'silently': '静默地',

  // 其他名词
  'tool': '工具',
  'command': '命令',
  'path': '路径',
  'setting': '设置',
  'option': '选项',
  'key': '密钥',

  // 常见介词/连词
  'from': '从',
  'into': '进入',
  'with': '使用',
  'without': '不适用',
  'instead of': '而不是',
  'when': '当',
  'after': '之后',
  'before': '之前',
  'during': '期间',
  'between': '之间',
  'for': '为了',
  'of': '的',
  'in': '在',
  'on': '在',
  'by': '通过',
  'and': '和',
  'or': '或',
  'but': '但是',

  // 常见句式
  'thanks to': '感谢',
  'related to': '相关',
  'based on': '基于',
}

// 分类规则
const categoryRules = [
  { keywords: ['browser', 'chrome', 'cdp', 'mcp'], category: 'browser', label: '🌐 浏览器支持' },
  { keywords: ['discord', 'slack', 'telegram', 'whatsapp', 'feishu', 'signal', 'message', 'channel'], category: 'channels', label: '💬 消息渠道' },
  { keywords: ['github', 'actions', 'ci', 'deploy', 'workflow'], category: 'ci', label: '🔄 CI/CD' },
  { keywords: ['plugin', 'skill', 'clawhub', 'install'], category: 'plugins', label: '🧩 插件/技能' },
  { keywords: ['model', 'openai', 'openrouter', 'anthropic', 'mistral', 'minimax', 'codex', 'pricing', 'oauth', 'token'], category: 'models', label: '🤖 模型集成' },
  { keywords: ['agent', 'subagent', 'worker', 'runtime'], category: 'agents', label: '🤖 Agent系统' },
  { keywords: ['voice', 'call', 'phone', 'plivo', 'audio', 'tts', 'speech'], category: 'voice', label: '📞 语音通话' },
  { keywords: ['gateway', 'server', 'config', 'doctor', 'diagnos'], category: 'core', label: '⚙️ 核心系统' },
  { keywords: ['webhook', 'api', 'rest', 'http', 'request'], category: 'api', label: '🔌 API/接口' },
  { keywords: ['security', 'auth', 'permission', 'safe'], category: 'security', label: '🔐 安全相关' },
  { keywords: ['performance', 'speed', 'fast', 'optimiz'], category: 'performance', label: '🚀 性能优化' },
  { keywords: ['memory', 'leak', 'cache', 'storage'], category: 'data', label: '💾 数据/缓存' },
  { keywords: ['linux', 'macos', 'windows', 'platform'], category: 'platform', label: '🖥️ 平台支持' },
  { keywords: ['proxy', 'network', 'connection', 'timeout', 'firewall'], category: 'network', label: '🌍 网络/代理' },
  { keywords: ['fix', 'fixes', 'fixed', 'bug', 'issue', 'error', 'crash', 'regression'], category: 'fixes', label: '🐛 Bug修复' },
]

/**
 * 将英文文本翻译为中文
 */
function translateToChinese(text) {
  if (!text) return text
  let result = text
  const sortedTranslations = Object.entries(translations)
    .sort((a, b) => b[0].length - a[0].length)

  for (const [en, zh] of sortedTranslations) {
    const regex = new RegExp(`\\b${en}\\b`, 'gi')
    result = result.replace(regex, (match) => {
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
function categorizeChange(text) {
  const lowerText = text.toLowerCase()
  for (const rule of categoryRules) {
    if (rule.keywords.some(keyword => lowerText.includes(keyword))) {
      return { category: rule.category, label: rule.label }
    }
  }
  return { category: 'other', label: '📦 其他' }
}

/**
 * 判断变更类型
 */
function getChangeType(text) {
  const lowerText = text.toLowerCase()
  if (lowerText.startsWith('fix') || lowerText.startsWith('fixed')) {
    return { type: 'fix', icon: '🐛', label: '修复' }
  }
  if (lowerText.startsWith('feat') || lowerText.startsWith('new') || lowerText.startsWith('add')) {
    return { type: 'feat', icon: '✨', label: '新增' }
  }
  if (lowerText.startsWith('improve') || lowerText.startsWith('enhance') || lowerText.startsWith('update')) {
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
function parseReleaseData(rawData) {
  return rawData.map(release => {
    const lines = (release.body || '').split('\n').filter(Boolean)
    const changes = []
    let currentCategory = null

    for (const line of lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('#')) continue
      if (trimmed.startsWith('##')) {
        currentCategory = trimmed.replace('## ', '').replace(/\s*$/, '')
        continue
      }
      if (trimmed.startsWith('-') || trimmed.startsWith('*')) {
        const content = trimmed.replace(/^[-*]\s*/, '').trim()
        const linkMatch = content.match(/\[([^\]]+)\]\(([^)]+)\)/)
        let title = content
        let link = null
        if (linkMatch) {
          title = linkMatch[1]
          link = linkMatch[2]
        }
        const cat = categorizeChange(title)
        changes.push({
          title: translateToChinese(title),
          rawTitle: title,
          link,
          category: currentCategory || cat.category,
          categoryLabel: currentCategory || cat.label,
          type: getChangeType(title),
        })
      }
    }

    const changesByCategory = {}
    for (const change of changes) {
      if (!changesByCategory[change.category]) {
        changesByCategory[change.category] = { label: change.categoryLabel, items: [] }
      }
      changesByCategory[change.category].items.push(change)
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
      changesByCategory,
    }
  })
}

// 主流程
async function main() {
  console.log('📡 正在从 GitHub 获取 Releases...')
  
  const response = await fetch(
    'https://api.github.com/repos/openclaw/openclaw/releases?per_page=10',
    {
      headers: {
        'Accept': 'application/vnd.github+json',
        'User-Agent': 'openclaw-release-feed',
      }
    }
  )

  if (!response.ok) {
    console.error(`❌ GitHub API 请求失败: ${response.status}`)
    process.exit(1)
  }

  const rawData = await response.json()
  console.log(`✅ 获取到 ${rawData.length} 个 Releases`)

  const releases = parseReleaseData(rawData)

  const outputPath = path.join(__dirname, '../src/data/releases.json')
  fs.writeFileSync(outputPath, JSON.stringify(releases, null, 2))
  console.log(`💾 数据已保存到 ${outputPath}`)
}

main().catch(err => {
  console.error('❌ 发生错误:', err)
  process.exit(1)
})
