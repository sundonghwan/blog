// src/pages/Blog/BlogDetail.tsx
import { useParams, Link, useNavigate } from 'react-router-dom'
import { Calendar, Clock, ArrowLeft, ArrowRight } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { mockPosts } from '../../data/mockPosts'

// Post 타입 정의
interface Post {
  id: number
  title: string
  excerpt: string
  content?: string
  coverImage: string
  category: string
  tags: string[]
  createdAt: string
  readTime: number
}

const BlogDetail = () => {
  // URL 파라미터에서 id 가져오기
  // /blog/1 → id = "1"
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // id로 포스트 찾기
  // Number(id): 문자열을 숫자로 변환
  const post = mockPosts.find((p: Post) => p.id === Number(id))

  // 이전/다음 포스트 찾기
  const currentIndex = mockPosts.findIndex((p: Post) => p.id === Number(id))
  const prevPost = currentIndex > 0 ? mockPosts[currentIndex - 1] : null
  const nextPost = currentIndex < mockPosts.length - 1 ? mockPosts[currentIndex + 1] : null

  // 포스트 없으면 404
  if (!post) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">포스트를 찾을 수 없습니다</h1>
          <Link to="/blog" className="text-blue-600 hover:underline">
            블로그로 돌아가기
          </Link>
        </div>
      </div>
    )
  }

  return (
    <article className="min-h-screen bg-white dark:bg-slate-900">
      {/* 뒤로가기 버튼 */}
      <div className="bg-slate-50 dark:bg-slate-800/50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-blue-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>뒤로가기</span>
          </button>
        </div>
      </div>

      {/* 커버 이미지 */}
      <div className="relative w-full h-64 sm:h-96 overflow-hidden">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
        {/* 그라디언트 오버레이 */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* 제목 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-4xl mx-auto">
            <span className="inline-block px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full mb-4">
              {post.category}
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {post.title}
            </h1>
          </div>
        </div>
      </div>

      {/* 메타 정보 */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center gap-6 text-slate-600 dark:text-slate-400">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{post.createdAt}</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}분</span>
          </div>
          {/* 태그들 */}
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-2 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-sm rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 본문 */}
      <div className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          {/* Markdown 렌더링 */}
          <div className="markdown-content text-slate-900 dark:text-slate-100">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              components={{
                // 코드 블록 커스터마이징
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || '')
                  return !inline && match ? (
                    <SyntaxHighlighter
                    style={oneDark}  // vscDarkPlus 대신 oneDark
                    language={match[1]}
                    PreTag="div"
                    customStyle={{
                        margin: 0,
                        borderRadius: '0.5rem',
                        fontSize: '0.875rem',
                        padding: '1rem',
                        backgroundColor: '#1e1e1e',  // 추가
                    }}
                    codeTagProps={{
                        style: {
                        background: 'transparent',  // 추가!
                        }
                    }}
                    {...props}
                    >
                    {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  )
                },
              }}
            >
              {post.content || post.excerpt}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* 이전/다음 포스트 네비게이션 */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* 이전 포스트 */}
            {prevPost && (
              <Link
                to={`/blog/${prevPost.id}`}
                className="group p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors"
              >
                <div className="flex items-center gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <ArrowLeft className="w-4 h-4" />
                  <span>이전 포스트</span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {prevPost.title}
                </h3>
              </Link>
            )}

            {/* 다음 포스트 */}
            {nextPost && (
              <Link
                to={`/blog/${nextPost.id}`}
                className="group p-6 rounded-lg border border-slate-200 dark:border-slate-800 hover:border-blue-500 dark:hover:border-blue-500 transition-colors md:text-right"
              >
                <div className="flex items-center justify-end gap-2 text-sm text-slate-500 dark:text-slate-400 mb-2">
                  <span>다음 포스트</span>
                  <ArrowRight className="w-4 h-4" />
                </div>
                <h3 className="font-bold text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {nextPost.title}
                </h3>
              </Link>
            )}
          </div>
        </div>
      </div>
    </article>
  )
}

export default BlogDetail