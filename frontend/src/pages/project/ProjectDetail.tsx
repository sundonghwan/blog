// src/pages/Projects/ProjectDetail.tsx
import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Github, ExternalLink, Users, Calendar, CheckCircle } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { mockProjects } from '../../data/mockProject'

interface Project {
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

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()

  // id로 프로젝트 찾기
  const project = mockProjects.find((p: Project) => p.id === Number(id))

  // 프로젝트 없으면 404
  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">프로젝트를 찾을 수 없습니다</h1>
          <button
            onClick={() => navigate('/projects')}
            className="text-blue-600 hover:underline"
          >
            프로젝트 목록으로 돌아가기
          </button>
        </div>
      </div>
    )
  }

  // 상태 텍스트
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
    <article className="min-h-screen bg-white dark:bg-slate-900">
      
      {/* 뒤로가기 버튼 */}
      <div className="bg-slate-50 dark:bg-slate-800/50 py-4 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto flex justify-end">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-100 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>뒤로가기</span>
          </button>
        </div>
      </div>

      {/* 썸네일 이미지 */}
      <div className="relative w-full h-64 sm:h-96 overflow-hidden">
        <img
          src={project.thumbnail}
          alt={project.title}
          className="w-full h-full object-cover"
        />
        
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
        
        {/* 제목 오버레이 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-8">
          <div className="max-w-6xl mx-auto">
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              {project.title}
            </h1>
            <p className="text-lg text-white/90">
              {project.description}
              
            </p>
            
          </div>
        </div>
        
      </div>
 
      {/* 프로젝트 정보 섹션 */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800 py-8 px-4 sm:px-6 lg:px-8">
        
        <div className="max-w-6xl mx-auto">
        {/* 링크 버튼들 */}
        <div className="flex flex-wrap gap-4 mr-8 justify-end">
            {project.githubUrl && (
            <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
                <Github className="w-5 h-5" />
                <span>GitHub 저장소</span>
            </a>
            )}
            {project.liveUrl && (
            <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
            >
                <ExternalLink className="w-5 h-5" />
                <span>라이브 데모</span>
            </a>
            )}
        </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-between mt-8">
            
            {/* 역할 */}
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  역할
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {project.role}
                  {project.teamSize && ` (팀 ${project.teamSize}명)`}
                </p>
              </div>
            </div>

            {/* 기간 */}
            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  기간
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {project.startDate} {project.endDate && `- ${project.endDate}`}
                </p>
              </div>
            </div>

            {/* 상태 */}
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-1" />
              <div>
                <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                  상태
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  {getStatusText(project.status)}
                </p>
              </div>
            </div>
          </div>
          
        </div>
      </div>

      {/* 기술 스택 섹션 */}
      <div className="py-12 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            기술 스택
          </h2>
          <div className="flex flex-wrap gap-3">
            {project.techStack.map((tech) => (
              <span
                key={tech}
                className="px-4 py-2 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-900 dark:text-slate-100 rounded-lg font-medium"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* 상세 내용 */}
      {project.detailContent && (
        <div className="py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100 mb-6">
              프로젝트 상세
            </h2>
            <div className="markdown-content text-slate-900 dark:text-slate-100">
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code({ node, inline, className, children, ...props }) {
                    const match = /language-(\w+)/.exec(className || '')
                    return !inline && match ? (
                      <SyntaxHighlighter
                        style={oneDark}
                        language={match[1]}
                        PreTag="div"
                        customStyle={{
                          margin: 0,
                          borderRadius: '0.5rem',
                          fontSize: '0.875rem',
                          padding: '1rem',
                          backgroundColor: '#1e1e1e',
                        }}
                        codeTagProps={{
                          style: {
                            background: 'transparent',
                          }
                        }}
                        {...props}
                      >
                        {String(children).replace(/\n$/, '')}
                      </SyntaxHighlighter>
                    ) : (
                      <code {...props}>
                        {children}
                      </code>
                    )
                  },
                }}
              >
                {project.detailContent}
              </ReactMarkdown>
            </div>
          </div>
        </div>
      )}

      {/* 다른 프로젝트 보기 */}
      <div className="border-t border-slate-200 dark:border-slate-800 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto text-center">

          <button
            onClick={() => navigate('/projects')}
            className="inline-flex items-center gap-2 px-6 py-3 bg-slate-900 dark:bg-slate-700 text-white rounded-lg hover:opacity-90 transition-opacity font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>다른 프로젝트 보기</span>
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProjectDetail