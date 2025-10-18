import { useState } from 'react'
import { Search } from 'lucide-react'
import PostCard from '../../components/blog/PostCard'
import { mockPosts } from '../../data/mockPosts'


interface Post {
  id: number
  title: string
  excerpt: string
  coverImage: string
  category: string
  tags: string[]
  createdAt: string
  readTime: number
}

const BlogList = () => {
  // 검색어 상태
  const [searchQuery, setSearchQuery] = useState('')
  // 선택된 카테고리 상태
  const [selectedCategory, setSelectedCategory] = useState('All')

  // 카테고리 목록
  const categories = ['All', 'React', 'Backend', 'DevOps', 'TypeScript']

  // 필터링된 포스트
  // filter: 배열에서 조건에 맞는 항목만 추출
  const filteredPosts = mockPosts.filter((post: Post) => {
    // 카테고리 필터
    const matchCategory = selectedCategory === 'All' || post.category === selectedCategory
    
    // 검색어 필터 (제목이나 내용에 포함되면)
    const matchSearch = post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                       post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    
    // 둘 다 만족해야 함
    return matchCategory && matchSearch
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      {/* Hero 섹션 - 간단한 타이틀 */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Blog
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300">
            개발하며 배운 것들을 기록합니다
          </p>
        </div>
      </section>

      {/* 검색 & 필터 섹션 */}
      <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          
          {/* 검색바 */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <input
              type="text"
              placeholder="검색어를 입력하세요..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 카테고리 필터 탭 */}
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`
                  px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                  ${selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }
                `}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 포스트 그리드 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 결과 개수 표시 */}
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            총 <span className="font-bold text-slate-900 dark:text-slate-100">{filteredPosts.length}</span>개의 포스트
          </div>

          {/* 포스트 없을 때 */}
          {filteredPosts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-400">검색 결과가 없습니다</p>
            </div>
          ) : (
            /* 포스트 그리드 */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredPosts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}

          {/* 페이지네이션 (나중에 추가) */}
          {/* <Pagination /> */}
        </div>
      </section>
    </div>
  )
}

export default BlogList
