// src/components/layout/AdminLayout.tsx
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { LayoutDashboard, FileText, Briefcase, LogOut, Moon, Sun } from 'lucide-react'
import { useAppDispatch, useAppSelector } from '../../store/hook'
import { toggleTheme } from '../../store/slices/themeSlice'
import { Settings } from 'lucide-react'  // 추가!

interface AdminLayoutProps {
  children: React.ReactNode  // children: 자식 컴포넌트를 받음
}

const AdminLayout = ({ children }: AdminLayoutProps) => {
  const navigate = useNavigate()
  const location = useLocation()
  const dispatch = useAppDispatch()
  const mode = useAppSelector((state) => state.theme.mode)

  // 로그아웃 처리
  const handleLogout = () => {
    localStorage.removeItem('isAdmin')
    navigate('/login')
  }

  // 현재 경로가 active인지 확인
  const isActive = (path: string) => {
    return location.pathname === path
  }

  // 사이드바 메뉴 항목들
  const menuItems = [
    { path: '/admin', icon: LayoutDashboard, label: '대시보드' },
    { path: '/admin/posts', icon: FileText, label: '포스트 관리' },
    { path: '/admin/projects', icon: Briefcase, label: '프로젝트 관리' },
    { path: '/admin/profile', icon: Settings, label: '프로필 설정' },  // 추가!
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      {/* 사이드바 */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-slate-800 border-r border-slate-200 dark:border-slate-700 z-50">
        
        {/* 로고 */}
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-2xl font-bold bg-gray-600 dark:text-slate-200 bg-clip-text text-transparent">
              TechBlog
            </span>
          </Link>
          <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
            관리자 모드
          </p>
        </div>

        {/* 메뉴 */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const Icon = item.icon
              return (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center gap-3 px-4 py-3 rounded-lg transition-colors
                      ${isActive(item.path)
                        ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                        : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* 하단 액션 */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-2">
            {/* 다크모드 토글 */}
            <button
              onClick={() => dispatch(toggleTheme())}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-colors"
            >
              {mode === 'light' ? (
                <Moon className="w-5 h-5" />
              ) : (
                <Sun className="w-5 h-5" />
              )}
              <span className="font-medium">테마 변경</span>
            </button>

            {/* 로그아웃 */}
            <button
              onClick={handleLogout}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <LogOut className="w-5 h-5" />
              <span className="font-medium">로그아웃</span>
            </button>
          </div>
        </div>
      </aside>

      {/* 메인 콘텐츠 */}
      <main className="ml-64 min-h-screen">
        {children}
      </main>
    </div>
  )
}

export default AdminLayout