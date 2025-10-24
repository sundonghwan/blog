import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Search, X, FileText, Briefcase, Clock } from 'lucide-react'
import { mockPosts } from '../data/mockPosts'
import { mockProjects } from '../data/mockProject'

interface SearchModalProps {
  isOpen: boolean
  onClose: () => void
}

interface SearchResult {
  type: 'post' | 'project'
  id: number
  title: string
  description: string
  url: string
  category?: string
  tags?: string[]
  techStack?: string[]
  date?: string
}

const SearchModal = ({ isOpen, onClose }: SearchModalProps) => {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState<SearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)

  // 검색 실행
  useEffect(() => {
    if (query.length < 2) {
      setResults([])
      return
    }

    setIsSearching(true)

    // 간단한 디바운스 효과
    const timer = setTimeout(() => {
      const searchResults: SearchResult[] = []

      // 블로그 포스트 검색
      mockPosts.forEach(post => {
        const searchText = `${post.title} ${post.excerpt} ${post.category} ${post.tags.join(' ')}`.toLowerCase()
        if (searchText.includes(query.toLowerCase())) {
          searchResults.push({
            type: 'post',
            id: post.id,
            title: post.title,
            description: post.excerpt,
            url: `/blog/${post.id}`,
            category: post.category,
            tags: post.tags,
            date: post.createdAt
          })
        }
      })

      // 프로젝트 검색
      mockProjects.forEach(project => {
        const searchText = `${project.title} ${project.description} ${project.techStack.join(' ')} ${project.role}`.toLowerCase()
        if (searchText.includes(query.toLowerCase())) {
          searchResults.push({
            type: 'project',
            id: project.id,
            title: project.title,
            description: project.description,
            url: `/projects/${project.id}`,
            techStack: project.techStack,
            date: project.startDate
          })
        }
      })

      // 관련성 기준으로 정렬 (제목에 포함된 것을 우선)
      searchResults.sort((a, b) => {
        const aInTitle = a.title.toLowerCase().includes(query.toLowerCase())
        const bInTitle = b.title.toLowerCase().includes(query.toLowerCase())
        if (aInTitle && !bInTitle) return -1
        if (!aInTitle && bInTitle) return 1
        return 0
      })

      setResults(searchResults.slice(0, 8)) // 최대 8개 결과
      setIsSearching(false)
    }, 300)

    return () => clearTimeout(timer)
  }, [query])

  // ESC 키로 닫기
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEsc)
      document.body.style.overflow = 'hidden'
    }

    return () => {
      document.removeEventListener('keydown', handleEsc)
      document.body.style.overflow = 'unset'
    }
  }, [isOpen, onClose])

  // 모달이 닫혀있으면 렌더링하지 않음
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* 배경 오버레이 */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* 모달 콘텐츠 */}
      <div className="relative min-h-screen flex items-start justify-center p-4 pt-16 sm:pt-24">
        <div className="relative w-full max-w-2xl bg-white dark:bg-slate-800 rounded-xl shadow-2xl">

          {/* 검색 입력 */}
          <div className="flex items-center p-4 border-b border-slate-200 dark:border-slate-700">
            <Search className="w-5 h-5 text-slate-400 mr-3" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="블로그 포스트, 프로젝트 검색..."
              className="flex-1 bg-transparent text-slate-900 dark:text-slate-100 placeholder-slate-500 focus:outline-none text-lg"
              autoFocus
            />
            <button
              onClick={onClose}
              className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 ml-3"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* 검색 결과 */}
          <div className="max-h-96 overflow-y-auto">
            {query.length < 2 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>검색어를 2글자 이상 입력해주세요</p>
              </div>
            ) : isSearching ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mb-4"></div>
                <p>검색 중...</p>
              </div>
            ) : results.length === 0 ? (
              <div className="p-8 text-center text-slate-500 dark:text-slate-400">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>검색 결과가 없습니다</p>
                <p className="text-sm mt-2">다른 키워드로 시도해보세요</p>
              </div>
            ) : (
              <div className="py-2">
                {results.map((result) => (
                  <Link
                    key={`${result.type}-${result.id}`}
                    to={result.url}
                    onClick={onClose}
                    className="block px-4 py-3 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      {/* 타입 아이콘 */}
                      <div className="flex-shrink-0 mt-1">
                        {result.type === 'post' ? (
                          <FileText className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                        ) : (
                          <Briefcase className="w-4 h-4 text-green-600 dark:text-green-400" />
                        )}
                      </div>

                      {/* 콘텐츠 */}
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-slate-900 dark:text-slate-100 truncate">
                          {result.title}
                        </h3>
                        <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2 mt-1">
                          {result.description}
                        </p>

                        {/* 메타 정보 */}
                        <div className="flex items-center gap-4 mt-2 text-xs text-slate-500 dark:text-slate-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {result.date}
                          </span>

                          {result.category && (
                            <span className="px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 rounded">
                              {result.category}
                            </span>
                          )}

                          {result.techStack && result.techStack.length > 0 && (
                            <div className="flex gap-1">
                              {result.techStack.slice(0, 3).map(tech => (
                                <span key={tech} className="px-2 py-0.5 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded">
                                  {tech}
                                </span>
                              ))}
                              {result.techStack.length > 3 && (
                                <span className="text-slate-400">+{result.techStack.length - 3}</span>
                              )}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* 푸터 힌트 */}
          {results.length > 0 && (
            <div className="px-4 py-3 border-t border-slate-200 dark:border-slate-700 text-xs text-slate-500 dark:text-slate-400">
              {results.length}개 결과 · ESC로 닫기
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default SearchModal