// src/pages/Home.tsx

const Home = () => {
  return (
    <div>
      <section className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        {/* 배경 그라디언트 효과 */}
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-50 via-white to-purple-50 dark:from-slate-900 dark:via-slate-900 dark:to-slate-800" />
        
        {/* 컨텐츠 컨테이너 */}
        <div className="max-w-4xl mx-auto text-center">
          
          {/* 👋 인사말 뱃지 */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400 text-sm font-medium mb-8">
            <span>👋</span>
            <span>Welcome to my blog</span>
          </div>

          {/* 메인 타이틀 */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            안녕하세요!
            <br />
            개발자 블로그입니다
          </h1>

          {/* 서브 타이틀 */}
          <p className="text-xl sm:text-2xl text-slate-600 dark:text-slate-300 mb-12 max-w-2xl mx-auto">
            React, TypeScript, AWS를 공부하며 배운 것들을 기록합니다
          </p>

          {/* CTA 버튼들 */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            {/* 블로그 보기 버튼 */}
            <a
              href="/blog"
              className="px-8 py-4 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-lg font-semibold hover:opacity-90 transition-opacity"
            >
              블로그 보기
            </a>
            
            {/* 프로젝트 보기 버튼 */}
            <a
              href="/projects"
              className="px-8 py-4 bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-slate-100 rounded-lg font-semibold hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors"
            >
              프로젝트 보기
            </a>
          </div>

          {/* 스크롤 인디케이터 (선택사항) */}
          <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
            <svg
              className="w-6 h-6 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </div>
        </div>
      </section>

      {/* 여기에 다른 섹션들 추가 예정 */}
      {/* - 최신 블로그 포스트 */}
      {/* - Featured 프로젝트 */}
        </div>
    )
}

export default Home