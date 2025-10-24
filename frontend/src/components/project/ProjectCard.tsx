// src/components/project/ProjectCard.tsx
import { Link } from 'react-router-dom'
import { Github, ExternalLink, Users, Calendar } from 'lucide-react'

interface Project {
  id: number
  title: string
  description: string
  thumbnail: string
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

interface ProjectCardProps {
  project: Project
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  // 상태 배지 색상
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400'
      case 'in-progress':
        return 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
      case 'archived':
        return 'bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-400'
      default:
        return 'bg-slate-100 text-slate-700'
    }
  }

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed':
        return '완료'
      case 'in-progress':
        return '진행중'
      case 'archived':
        return '보관'
      default:
        return status
    }
  }

  return (
    <Link to={`/projects/${project.id}`}>
        <article className="group bg-white dark:bg-slate-800 rounded-xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 border border-slate-200 dark:border-slate-700">
        
        {/* 썸네일 */}
        <div className="relative aspect-video overflow-hidden">
            <img
            src={project.thumbnail}
            alt={project.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {/* 상태 배지 */}
            <div className="absolute top-4 right-4">
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(project.status)}`}>
                {getStatusText(project.status)}
            </span>
            </div>
        </div>

        {/* 내용 */}
        <div className="p-6">
            {/* 제목 */}

            <h3 className="text-xl font-bold mb-2 text-slate-900 dark:text-slate-100">
                {project.title}
            </h3>

            {/* 설명 */}
            <p className="text-slate-600 dark:text-slate-300 mb-4 line-clamp-2">
            {project.description}
            </p>

            {/* 메타 정보 */}
            <div className="flex items-center gap-4 text-sm text-slate-500 dark:text-slate-400 mb-4">
            {/* 역할 */}
            <div className="flex items-center gap-1">
                <Users className="w-4 h-4" />
                <span>{project.role}</span>
            </div>
            {/* 기간 */}
            <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>{project.startDate}</span>
            </div>
            </div>

            {/* 기술 스택 */}
            <div className="flex flex-wrap gap-2 mb-4">
            {project.techStack.slice(0, 4).map((tech) => (
                <span
                key={tech}
                className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 text-xs rounded font-medium"
                >
                {tech}
                </span>
            ))}
            {project.techStack.length > 4 && (
                <span className="px-2 py-1 text-slate-500 dark:text-slate-400 text-xs">
                +{project.techStack.length - 4}
                </span>
            )}
            </div>

            {/* 링크 버튼들 */}
            <div className="flex gap-2">
            {project.githubUrl && (
                <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                <Github className="w-4 h-4" />
                <span>GitHub</span>
                </a>
            )}
            {project.liveUrl && (
                <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity"
                >
                <ExternalLink className="w-4 h-4" />
                <span>Demo</span>
                </a>
            )}
            </div>
        </div>
        </article>
    </Link>
  )
}

export default ProjectCard