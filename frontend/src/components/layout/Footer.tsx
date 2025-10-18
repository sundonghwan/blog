// src/components/layout/Footer.tsx
import { Link } from 'react-router-dom'
import { Github, Linkedin, Mail, Heart } from 'lucide-react'

const Footer = () => {
  // 현재 연도
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        
        {/* 상단 섹션 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          
          {/* 로고 & 소개 */}
          <div className="md:col-span-2">
            <Link to="/" className="inline-block mb-4">
              <span className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                TechBlog
              </span>
            </Link>
            <p className="text-slate-600 dark:text-slate-400 mb-4">
              개발하며 배운 것들을 기록하고 공유합니다.
            </p>
            {/* SNS 링크 */}
            <div className="flex gap-4">
              <a
                href="https://github.com/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="GitHub"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/in/yourusername"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a
                href="mailto:your@email.com"
                className="p-2 rounded-lg bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-300 dark:hover:bg-slate-700 transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* 사이트맵 - Blog */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">
              Blog
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/blog"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  전체 포스트
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/category/react"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  React
                </Link>
              </li>
              <li>
                <Link
                  to="/blog/category/backend"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Backend
                </Link>
              </li>
            </ul>
          </div>

          {/* 사이트맵 - About */}
          <div>
            <h3 className="font-bold text-slate-900 dark:text-slate-100 mb-4">
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/projects"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  to="/about"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  About Me
                </Link>
              </li>
              <li>
                <a
                  href="mailto:your@email.com"
                  className="text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* 하단 구분선 */}
        <div className="border-t border-slate-200 dark:border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            
            {/* 저작권 */}
            <p className="text-slate-600 dark:text-slate-400 text-sm text-center md:text-left">
              © {currentYear} TechBlog. All rights reserved.
            </p>

            {/* Made with love */}
            <p className="text-slate-600 dark:text-slate-400 text-sm flex items-center gap-1">
              Made with <Heart className="w-4 h-4 text-red-500 fill-current" /> by Your Name
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer