// 示例数据 - 实际使用时会被 GitHub Actions 更新的数据替换
export const sampleReleases = [
  {
    id: 1,
    tagName: 'v2026.3.23',
    name: 'OpenClaw v2026.3.23',
    htmlUrl: 'https://github.com/openclaw/openclaw/releases/tag/v2026.3.23',
    publishedAt: '2026-03-23T10:00:00Z',
    author: {
      name: 'openclaw',
      avatar: 'https://avatars.githubusercontent.com/u/github',
      url: 'https://github.com/openclaw',
    },
    isPrerelease: false,
    isDraft: false,
    changes: [
      {
        title: '修复了 macOS Chrome 附加流程中的超时问题',
        rawTitle:
          'Fixes Browser/Chrome MCP: wait for existing-session browser tabs to become usable after attach',
        link: 'https://github.com/openclaw/openclaw/issues/52930',
        category: 'browser',
        categoryLabel: '🌐 浏览器支持',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了 Linux headless 环境下第二次启动浏览器时的回归问题',
        rawTitle:
          'Browser/CDP: reuse an already-running loopback browser after a short initial reachability miss',
        link: 'https://github.com/openclaw/openclaw/issues/53004',
        category: 'browser',
        categoryLabel: '🌐 浏览器支持',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了 macOS 上技能浏览器的登录状态丢失问题',
        rawTitle:
          'ClawHub/macOS auth: honor macOS auth config and XDG auth paths for saved ClawHub credentials',
        link: 'https://github.com/openclaw/openclaw/issues/53034',
        category: 'plugins',
        categoryLabel: '🧩 插件/技能',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了飞书图片/文件附件无法发送的问题',
        rawTitle:
          'Plugins/message tool: route Feishu message sends through the outbound media path',
        link: 'https://github.com/openclaw/openclaw/issues/52970',
        category: 'channels',
        categoryLabel: '💬 消息渠道',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了 OpenRouter 自动定价无限递归刷新的问题',
        rawTitle:
          'Gateway/model pricing: stop openrouter/auto pricing refresh from recursing indefinitely',
        link: 'https://github.com/openclaw/openclaw/issues/53035',
        category: 'models',
        categoryLabel: '🤖 模型集成',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了代理环境下 OpenAI Codex OAuth token 刷新失败的问题',
        rawTitle:
          'Models/OpenAI Codex OAuth: bootstrap the env-configured HTTP/HTTPS proxy dispatcher',
        link: 'https://github.com/openclaw/openclaw/pull/52228',
        category: 'models',
        categoryLabel: '🤖 模型集成',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了子 Agent 超时判断不准确的问题',
        rawTitle:
          'Agents/subagents: recheck timed-out worker waits against the latest runtime snapshot',
        link: 'https://github.com/openclaw/openclaw/issues/53106',
        category: 'agents',
        categoryLabel: '🤖 Agent系统',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
      {
        title: '修复了 Plivo v2 的重放密钥不稳定问题',
        rawTitle: 'Voice-call/Plivo: stabilize Plivo v2 replay keys',
        link: null,
        category: 'voice',
        categoryLabel: '📞 语音通话',
        type: { type: 'fix', icon: '🐛', label: '修复' },
      },
    ],
    changesByCategory: {
      browser: {
        label: '🌐 浏览器支持',
        items: [
          {
            title: '修复了 macOS Chrome 附加流程中的超时问题',
            link: 'https://github.com/openclaw/openclaw/issues/52930',
            type: { icon: '🐛', label: '修复' },
          },
          {
            title: '修复了 Linux headless 环境下第二次启动浏览器时的回归问题',
            link: 'https://github.com/openclaw/openclaw/issues/53004',
            type: { icon: '🐛', label: '修复' },
          },
        ],
      },
      plugins: {
        label: '🧩 插件/技能',
        items: [
          {
            title: '修复了 macOS 上技能浏览器的登录状态丢失问题',
            link: 'https://github.com/openclaw/openclaw/issues/53034',
            type: { icon: '🐛', label: '修复' },
          },
        ],
      },
      channels: {
        label: '💬 消息渠道',
        items: [
          {
            title: '修复了飞书图片/文件附件无法发送的问题',
            link: 'https://github.com/openclaw/openclaw/issues/52970',
            type: { icon: '🐛', label: '修复' },
          },
        ],
      },
      models: {
        label: '🤖 模型集成',
        items: [
          {
            title: '修复了 OpenRouter 自动定价无限递归刷新的问题',
            link: 'https://github.com/openclaw/openclaw/issues/53035',
            type: { icon: '🐛', label: '修复' },
          },
          {
            title: '修复了代理环境下 OpenAI Codex OAuth token 刷新失败的问题',
            link: 'https://github.com/openclaw/openclaw/pull/52228',
            type: { icon: '🐛', label: '修复' },
          },
        ],
      },
      agents: {
        label: '🤖 Agent系统',
        items: [
          {
            title: '修复了子 Agent 超时判断不准确的问题',
            link: 'https://github.com/openclaw/openclaw/issues/53106',
            type: { icon: '🐛', label: '修复' },
          },
        ],
      },
      voice: {
        label: '📞 语音通话',
        items: [
          {
            title: '修复了 Plivo v2 的重放密钥不稳定问题',
            link: null,
            type: { icon: '🐛', label: '修复' },
          },
        ],
      },
    },
  },
]

export default sampleReleases
