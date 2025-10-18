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

export type { Post }  // 이렇게!
