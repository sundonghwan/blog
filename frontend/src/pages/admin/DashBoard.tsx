// src/pages/Admin/Dashboard.tsx
import { Link } from 'react-router-dom'
import { FileText, Briefcase, Eye, TrendingUp, Plus } from 'lucide-react'
import { mockPosts } from '../../data/mockPosts'
import { mockProjects } from '../../data/mockProject'

const Dashboard = () => {
  // 통계 계산
  const totalPosts = mockPosts.length
  const totalProjects = mockProjects.length
  const totalViews = mockPosts.reduce((sum, post) => sum + (post.viewCount || 0), 0)
  const recentPosts = mockPosts.slice(0, 5)

  // 통계 카드 데이터
  const stats = [
    { 
      label: '전체 포스트', 
      value: totalPosts, 
      icon: FileText, 
      color: 'blue',
      link: '/admin/posts'
    },
    { 
      label: '전체 프로젝트', 
      value: totalProjects, 
      icon: Briefcase, 
      color: 'purple',
      link: '/admin/projects'
    },
    { 
      label: '총 조회수', 
      value: totalViews.toLocaleString(), 
      icon: Eye, 
      color: 'green',
      link: '/admin/posts'
    },
    { 
      label: '이번 달 증가', 
      value: '+12%', 
      icon: TrendingUp, 
      color: 'orange',
      link: '/admin/posts'
    },
  ]

  // 색상 매핑
  const getColorClasses = (color: string) => {
    const colors: Record<string, string> = {
      blue: 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400',
      purple: 'bg-purple-50 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400',
      green: 'bg-green-50 dark:bg-green-900/20 text-green-600 dark:text-green-400',
      orange: 'bg-orange-50 dark:bg-orange-900/20 text-orange-600 dark:text-orange-400',
    }
    return colors[color] || colors.blue
  }

  return (
    <div className="p-8">
      {/* 헤더 */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
          대시보드
        </h1>
        <p className="text-slate-600 dark:text-slate-400">
          블로그 관리 현황을 한눈에 확인하세요
        </p>
      </div>

      {/* 빠른 액션 버튼 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        <Link
          to="/admin/posts/new"
          className="flex items-center justify-center gap-2 p-4 bg-blue-400 hover:bg-blue-500 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>새 포스트 작성</span>
        </Link>
        <Link
          to="/admin/projects/new"
          className="flex items-center justify-center gap-2 p-4 bg-indigo-400 hover:bg-indigo-500 text-white rounded-lg transition-colors font-medium"
        >
          <Plus className="w-5 h-5" />
          <span>새 프로젝트 추가</span>
        </Link>
      </div>

      {/* 통계 카드 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => {
          const Icon = stat.icon
          return (
            <Link
              key={stat.label}
              to={stat.link}
              className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3 rounded-lg ${getColorClasses(stat.color)}`}>
                  <Icon className="w-6 h-6" />
                </div>
              </div>
              <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                {stat.label}
              </p>
              <p className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                {stat.value}
              </p>
            </Link>
          )
        })}
      </div>

      {/* 최근 포스트 */}
      <div className="bg-white dark:bg-slate-800 rounded-xl border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700 flex items-center justify-between">
          <h2 className="text-xl font-bold text-slate-900 dark:text-slate-100">
            최근 포스트
          </h2>
          <Link
            to="/admin/posts"
            className="text-blue-600 dark:text-blue-400 hover:underline text-sm"
          >
            전체보기
          </Link>
        </div>
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {recentPosts.map((post) => (
            <div key={post.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-semibold text-slate-900 dark:text-slate-100 mb-1">
                    {post.title}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    {post.createdAt} · {post.viewCount || 0} views
                  </p>
                </div>
                <Link
                  to={`/admin/posts/${post.id}/edit`}
                  className="ml-4 px-4 py-2 text-sm bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors"
                >
                  수정
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Dashboard