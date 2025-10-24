// src/pages/About.tsx
import { Github, Linkedin, Mail, MapPin, Calendar } from 'lucide-react'

const About = () => {
  // 기술 스택
  const skills = {
    'Frontend': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
    'Backend': ['Python', 'FastAPI', 'Node.js', 'Express', 'Django'],
    'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'],
    'DevOps': ['AWS', 'Docker', 'GitHub Actions', 'Vercel'],
  }

  // 경력/학력
  const timeline = [
    {
      year: '2025',
      title: 'Tech Blog 개발',
      description: 'React, FastAPI, AWS를 활용한 개인 기술 블로그 제작',
      type: 'project'
    },
    {
      year: '2024',
      title: 'Full-stack Developer',
      description: '스타트업에서 웹 서비스 개발',
      type: 'work'
    },
    {
      year: '2023',
      title: '컴퓨터공학 전공',
      description: 'OO대학교 졸업',
      type: 'education'
    },
  ]

  return (
    <div className="min-h-screen bg-white dark:bg-slate-900">
      
      {/* Hero 섹션 */}
      <section className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900 py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* 프로필 이미지 */}
          <div className="w-32 h-32 mx-auto mb-6 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center text-white text-4xl font-bold">
            YN
          </div>
          
          <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Your Name
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-300 mb-8">
            Full-stack Developer
          </p>

          {/* 소셜 링크 */}
          <div className="flex justify-center gap-4">
            <a
              href="https://github.com/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <Github className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <Linkedin className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </a>
            <a
              href="mailto:your@email.com"
              className="p-3 bg-white dark:bg-slate-800 rounded-lg hover:shadow-lg transition-shadow"
            >
              <Mail className="w-6 h-6 text-slate-700 dark:text-slate-300" />
            </a>
          </div>
        </div>
      </section>

      {/* 소개 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-6">
            About Me
          </h2>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              안녕하세요! 웹 개발을 사랑하는 개발자입니다.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
              React, TypeScript, FastAPI 등 모던 웹 기술을 활용하여 
              사용자 경험을 중시하는 서비스를 만들고 있습니다.
            </p>
            <p className="text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
              이 블로그에서는 개발하면서 배운 것들과 경험을 기록하고 공유합니다.
            </p>
          </div>

          {/* 위치 & 경력 */}
          <div className="mt-8 flex flex-wrap gap-6 text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              <span>Seoul, Korea</span>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5" />
              <span>3+ years experience</span>
            </div>
          </div>
        </div>
      </section>

      {/* 기술 스택 섹션 */}
      <section className="py-20 px-4 bg-slate-50 dark:bg-slate-800/50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Skills
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Object.entries(skills).map(([category, items]) => (
              <div key={category}>
                <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  {category}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 rounded-lg text-sm"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 타임라인 섹션 */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-8">
            Timeline
          </h2>
          <div className="space-y-8">
            {timeline.map((item, index) => (
              <div key={index} className="flex gap-6">
                {/* 연도 */}
                <div className="flex-shrink-0 w-20 text-right">
                  <span className="text-lg font-bold text-blue-600 dark:text-blue-400">
                    {item.year}
                  </span>
                </div>
                {/* 선 */}
                <div className="flex-shrink-0 w-px bg-slate-200 dark:bg-slate-700 relative">
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-blue-600 dark:bg-blue-400" />
                </div>
                {/* 내용 */}
                <div className="flex-1 pb-8">
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-2">
                    {item.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact 섹션 */}
      <section className="py-20 px-4 bg-gradient-to-br from-blue-50 to-purple-50 dark:from-slate-800 dark:to-slate-900">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            Let's Connect
          </h2>
          <p className="text-lg text-slate-600 dark:text-slate-300 mb-8">
            프로젝트 협업이나 문의사항이 있으시면 편하게 연락주세요!
          </p>
          <a
            href="mailto:your@email.com"
            className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            <Mail className="w-5 h-5" />
            <span>이메일 보내기</span>
          </a>
        </div>
      </section>
    </div>
  )
}

export default About