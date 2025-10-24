// src/types/project.ts
export interface Project {
  id: number
  title: string
  description: string
  detailContent?: string
  thumbnail: string
  images?: string[]
  techStack: string[]
  role: string
  teamSize?: number
  githubUrl?: string
  liveUrl?: string
  startDate: string
  endDate?: string
  status: 'completed' | 'in-progress' | 'archived'
  featured: boolean
}