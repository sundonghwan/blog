import { Link } from 'react-router-dom'
import { Home, ArrowLeft, Search } from 'lucide-react'

const NotFound = () => {
  return (
    <div className="min-h-screen bg-white dark:bg-slate-900 flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center">
        {/* 404 숫자 */}
        <div className="mb-8">
          <h1 className="text-8xl sm:text-9xl font-bold text-slate-200 dark:text-slate-700 select-none">
            404
          </h1>
        </div>

        {/* 메인 메시지 */}
        <div className="mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            페이지를 찾을 수 없습니다
          </h2>
          <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
            요청하신 페이지가 존재하지 않거나 이동했을 수 있습니다.
            <br />
            URL을 다시 확인해 주세요.
          </p>
        </div>

        {/* 액션 버튼들 */}
        <div className="space-y-4">
          <Link
            to="/"
            className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Home className="w-5 h-5" />
            <span>홈으로 돌아가기</span>
          </Link>

          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => window.history.back()}
              className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>뒤로가기</span>
            </button>

            <Link
              to="/blog"
              className="flex items-center justify-center gap-2 px-4 py-2 border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
            >
              <Search className="w-4 h-4" />
              <span>블로그 보기</span>
            </Link>
          </div>
        </div>

        {/* 추천 링크 */}
        <div className="mt-12 pt-8 border-t border-slate-200 dark:border-slate-700">
          <h3 className="text-sm font-medium text-slate-900 dark:text-slate-100 mb-4">
            추천 페이지
          </h3>
          <div className="flex flex-wrap justify-center gap-4 text-sm">
            <Link
              to="/blog"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              블로그
            </Link>
            <Link
              to="/projects"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              프로젝트
            </Link>
            <Link
              to="/about"
              className="text-blue-600 dark:text-blue-400 hover:underline"
            >
              소개
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NotFound