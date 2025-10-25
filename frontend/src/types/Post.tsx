interface Post {
  id: number
  title: string
  excerpt: string
  content?: string        // 본문 (BlogDetails에서 사용)
  coverImage: string
  category: string
  tags: string[]
  createdAt: string
  readTime: number
  viewCount?: number      // 조회수 (Admin에서 사용)
  published?: boolean     // 발행 여부 (Admin에서 사용)
}

export type { Post }
