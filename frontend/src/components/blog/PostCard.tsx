// src/components/blog/PostCard.tsx
import { Link } from 'react-router-dom'
import { Calendar, Clock } from 'lucide-react'

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
// Props: 부모 컴포넌트에서 받는 데이터
interface PostCardProps {
  post: Post  // Post 타입의 데이터를 받음
}

// PostCard 컴포넌트
// { post }: Props를 구조 분해 할당으로 받음
const PostCard = ({ post }: PostCardProps) => {
  return (
    // article: 시맨틱 HTML (독립적인 콘텐츠)
    <article className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
      
      {/* 썸네일 이미지 */}
      <Link to={`/blog/${post.id}`}>
        <div className="relative aspect-video overflow-hidden">
          <img
            src={post.coverImage}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {/* 카테고리 뱃지 */}
          <div className="absolute top-4 left-4">
            <span className="px-3 py-1 bg-blue-600 text-white text-sm font-medium rounded-full">
              {post.category}
            </span>
          </div>
        </div>
      </Link>

      {/* 포스트 정보 */}
      <div className="p-6">
        {/* 제목 */}
        <Link to={`/blog/${post.id}`}>
          <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>

        {/* 요약 */}
        <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
          {post.excerpt}
        </p>

        {/* 태그들 */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* map: 배열을 순회하며 JSX 생성 */}
          {post.tags.map((tag) => (
            <span
              key={tag}  // 고유 키 필수!
              className="px-2 py-1 bg-slate-100 dark:bg-slate-700 text-slate-600 dark:text-slate-300 text-xs rounded"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* 메타 정보 (날짜, 읽기 시간) */}
        <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400">
          {/* 작성일 */}
          <div className="flex items-center gap-1">
            <Calendar className="w-4 h-4" />
            <span>{post.createdAt}</span>
          </div>
          {/* 읽기 시간 */}
          <div className="flex items-center gap-1">
            <Clock className="w-4 h-4" />
            <span>{post.readTime}분</span>
          </div>
        </div>
      </div>
    </article>
  )
}

export default PostCard