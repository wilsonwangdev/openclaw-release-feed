import { useState, useMemo } from 'react'
import { Github, ExternalLink, ChevronDown, ChevronUp, RefreshCw, Calendar, Tag, Bug, Sparkles, Zap, AlertTriangle, BookOpen } from 'lucide-react'
import { sampleReleases } from './data/sample-data'
import { formatDate, formatDateTime } from './data/releases'

// 获取真实数据或使用示例数据
import realData from './data/releases.json'
const releases = realData?.length > 0 ? realData : sampleReleases

function App() {
  const [selectedVersion, setSelectedVersion] = useState(0)
  const [expandedCategories, setExpandedCategories] = useState({})
  const [activeFilter, setActiveFilter] = useState('all')

  const currentRelease = releases[selectedVersion]

  const filteredChanges = useMemo(() => {
    if (activeFilter === 'all') return currentRelease.changes
    return currentRelease.changes.filter(c => c.category === activeFilter)
  }, [currentRelease, activeFilter])

  const toggleCategory = (cat) => {
    setExpandedCategories(prev => ({ ...prev, [cat]: !prev[cat] }))
  }

  const categories = Object.entries(currentRelease.changesByCategory)

  const getTypeIcon = (type) => {
    const icons = {
      fix: <Bug className="w-4 h-4" />,
      feat: <Sparkles className="w-4 h-4" />,
      improve: <Zap className="w-4 h-4" />,
      security: <AlertTriangle className="w-4 h-4" />,
      breaking: <AlertTriangle className="w-4 h-4" />,
      other: <Sparkles className="w-4 h-4" />,
    }
    return icons[type] || icons.other
  }

  const getTypeColor = (type) => {
    const colors = {
      fix: 'text-red-400 bg-red-400/10 border-red-400/20',
      feat: 'text-green-400 bg-green-400/10 border-green-400/20',
      improve: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
      security: 'text-orange-400 bg-orange-400/10 border-orange-400/20',
      breaking: 'text-red-500 bg-red-500/10 border-red-500/20',
      other: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    }
    return colors[type] || colors.other
  }

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Header */}
      <header className="border-b border-white/5 bg-[#0f0f1a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center shadow-lg shadow-purple-500/20">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">OpenClaw 更新快讯</h1>
                <p className="text-xs text-gray-400">追踪最新版本发布</p>
              </div>
            </div>
            
            <a
              href="https://github.com/openclaw/openclaw/releases"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-gray-300 hover:text-white"
            >
              <Github className="w-4 h-4" />
              GitHub
              <ExternalLink className="w-3 h-3 opacity-50" />
            </a>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* Version Selector */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {releases.map((release, index) => (
              <button
                key={release.id}
                onClick={() => {
                  setSelectedVersion(index)
                  setExpandedCategories({})
                }}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  selectedVersion === index
                    ? 'bg-gradient-to-r from-pink-500 to-purple-600 text-white shadow-lg shadow-purple-500/20'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white border border-white/5'
                }`}
              >
                <span className="flex items-center gap-2">
                  <Tag className="w-3 h-3" />
                  {release.tagName}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Version Info Card */}
        <div className="bg-gradient-to-br from-[#1a1a2e] to-[#16162a] rounded-2xl border border-white/5 p-6 mb-8 animate-fade-in">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="text-2xl font-bold text-white">{currentRelease.name}</h2>
                {currentRelease.isPrerelease && (
                  <span className="px-2 py-1 rounded text-xs font-medium bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                    预发布
                  </span>
                )}
              </div>
              <div className="flex items-center gap-4 text-sm text-gray-400">
                <span className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  {formatDateTime(currentRelease.publishedAt)}
                </span>
                <a
                  href={currentRelease.htmlUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 hover:text-purple-400 transition-colors"
                >
                  <Github className="w-4 h-4" />
                  {currentRelease.author.name}
                </a>
              </div>
            </div>
            <a
              href={currentRelease.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 transition-all text-sm text-gray-300 hover:text-white"
            >
              阅读原文
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-white/5">
            <div className="text-center">
              <div className="text-3xl font-bold text-white">{currentRelease.changes.length}</div>
              <div className="text-xs text-gray-400 mt-1">总变更数</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-400">
                {currentRelease.changes.filter(c => c.type.type === 'fix').length}
              </div>
              <div className="text-xs text-gray-400 mt-1">Bug 修复</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-400">
                {currentRelease.changes.filter(c => c.type.type === 'feat').length}
              </div>
              <div className="text-xs text-gray-400 mt-1">新增功能</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-400">
                {Object.keys(currentRelease.changesByCategory).length}
              </div>
              <div className="text-xs text-gray-400 mt-1">涉及模块</div>
            </div>
          </div>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap gap-2 mb-6">
          <button
            onClick={() => setActiveFilter('all')}
            className={`px-3 py-1.5 rounded-full text-sm transition-all ${
              activeFilter === 'all'
                ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
            }`}
          >
            全部
          </button>
          {categories.map(([cat, { label }]) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              className={`px-3 py-1.5 rounded-full text-sm transition-all ${
                activeFilter === cat
                  ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30'
                  : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/5'
              }`}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Changes List */}
        <div className="space-y-3">
          {filteredChanges.map((change, index) => (
            <div
              key={`${change.rawTitle}-${index}`}
              className="bg-[#1a1a2e]/50 rounded-xl border border-white/5 p-4 hover:bg-[#1a1a2e] transition-all animate-fade-in"
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div className="flex items-start gap-3">
                <span className={`flex-shrink-0 px-2 py-1 rounded text-xs font-medium border ${getTypeColor(change.type.type)}`}>
                  {getTypeIcon(change.type.type)}
                  <span className="ml-1">{change.type.label}</span>
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-200 leading-relaxed">{change.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-xs px-2 py-0.5 rounded bg-white/5 text-gray-500">
                      {change.categoryLabel}
                    </span>
                    {change.link && (
                      <a
                        href={change.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 transition-colors"
                      >
                        <BookOpen className="w-3 h-3" />
                        查看详情
                        <ExternalLink className="w-2.5 h-2.5" />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredChanges.length === 0 && (
          <div className="text-center py-12 text-gray-500">
            <Sparkles className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>该分类暂无变更</p>
          </div>
        )}

        {/* Category Groups (Collapsed View) */}
        {activeFilter === 'all' && (
          <div className="mt-8 space-y-4">
            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
              <span className="w-1 h-6 bg-gradient-to-b from-purple-500 to-pink-500 rounded-full"></span>
              按模块查看
            </h3>
            {categories.map(([cat, { label, items }]) => (
              <details
                key={cat}
                className="bg-[#1a1a2e]/30 rounded-xl border border-white/5 overflow-hidden group"
                open={expandedCategories[cat]}
              >
                <summary
                  onClick={(e) => {
                    e.preventDefault()
                    toggleCategory(cat)
                  }}
                  className="flex items-center justify-between p-4 cursor-pointer hover:bg-white/5 transition-all list-none"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{label}</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-gray-400">
                      {items.length} 项
                    </span>
                  </div>
                  {expandedCategories[cat] ? (
                    <ChevronUp className="w-5 h-5 text-gray-400" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  )}
                </summary>
                <div className="border-t border-white/5">
                  {items.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-4 pt-3 border-b border-white/5 last:border-b-0 hover:bg-white/5 transition-all"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <span className={`flex-shrink-0 px-2 py-0.5 rounded text-xs font-medium border ${getTypeColor(item.type.type)}`}>
                          {getTypeIcon(item.type.type)}
                        </span>
                        <span className="text-sm text-gray-200">{item.title}</span>
                      </div>
                      {item.link && (
                        <a
                          href={item.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-purple-400 hover:text-purple-300 flex items-center gap-1 ml-8 mt-1 transition-colors"
                        >
                          #{item.link.split('/').pop()}
                          <ExternalLink className="w-2.5 h-2.5" />
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              </details>
            ))}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 mt-16 py-8">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <p className="text-sm text-gray-500">
            数据来源：<a href="https://github.com/openclaw/openclaw" target="_blank" rel="noopener noreferrer" className="text-purple-400 hover:text-purple-300">openclaw/openclaw</a>
            <span className="mx-2">•</span>
            由 GitHub Actions 自动同步
          </p>
          <p className="text-xs text-gray-600 mt-2">
            本页面由 OpenClaw AI 辅助构建
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
