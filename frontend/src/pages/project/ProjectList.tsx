// src/pages/Projects/ProjectList.tsx
import { useState } from 'react'
import ProjectCard from '../../components/project/ProjectCard'
import { mockProjects } from '../../data/mockProject'

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

const ProjectList = () => {
  // 선택된 필터 상태
  const [selectedFilter, setSelectedFilter] = useState<string>('all')

  // 필터 옵션
  const filters = [
    { value: 'all', label: 'All' },
    { value: 'featured', label: 'Featured' },
    { value: 'completed', label: 'Completed' },
    { value: 'in-progress', label: 'In Progress' },
  ]

  // 필터링된 프로젝트
  const filteredProjects = mockProjects.filter((project: Project) => {
    if (selectedFilter === 'all') return true
    if (selectedFilter === 'featured') return project.featured
    return project.status === selectedFilter
  })

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      
      {/* Hero 섹션 */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Projects
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto">
            제가 진행했던 프로젝트들을 소개합니다. 다양한 기술 스택을 활용하여 문제를 해결했습니다.
          </p>
        </div>
      </section>

      {/* 필터 섹션 */}
      <section className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 py-6 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
            {filters.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`
                  px-4 py-2 rounded-lg font-medium whitespace-nowrap transition-all
                  ${selectedFilter === filter.value
                    ? 'bg-blue-600 text-white'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                  }
                `}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* 프로젝트 그리드 */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* 결과 개수 */}
          <div className="mb-6 text-slate-600 dark:text-slate-400">
            총 <span className="font-bold text-slate-900 dark:text-slate-100">{filteredProjects.length}</span>개의 프로젝트
          </div>

          {/* 프로젝트 없을 때 */}
          {filteredProjects.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-xl text-slate-400">프로젝트가 없습니다</p>
            </div>
          ) : (
            /* 프로젝트 그리드 */
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  )
}

export default ProjectList