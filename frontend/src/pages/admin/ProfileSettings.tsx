// src/pages/Admin/ProfileSettings.tsx
import { useState } from 'react'
import { Save, Plus, X } from 'lucide-react'

interface TimelineItem {
  year: string
  title: string
  description: string
  type: 'project' | 'work' | 'education'
}

const ProfileSettings = () => {
  // 기본 정보
  const [name, setName] = useState('Your Name')
  const [title, setTitle] = useState('Full-stack Developer')
  const [bio, setBio] = useState('안녕하세요! 웹 개발을 사랑하는 개발자입니다.')
  const [location, setLocation] = useState('Seoul, Korea')
  const [email, setEmail] = useState('your@email.com')
  const [experience, setExperience] = useState('3+ years experience')
  const [githubUrl, setGithubUrl] = useState('https://github.com/yourusername')
  const [linkedinUrl, setLinkedinUrl] = useState('https://linkedin.com/in/yourusername')

  // 기술 스택 (About 페이지 구조에 맞춤)
  const [skills, setSkills] = useState({
    'Frontend': ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Redux'],
    'Backend': ['Python', 'FastAPI', 'Node.js', 'Express', 'Django'],
    'Database': ['PostgreSQL', 'MongoDB', 'Redis', 'DynamoDB'],
    'DevOps': ['AWS', 'Docker', 'GitHub Actions', 'Vercel']
  })

  // 타임라인
  const [timeline, setTimeline] = useState<TimelineItem[]>([
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
    }
  ])

  // 기술 스택 업데이트
  const updateSkills = (category: string, skillsText: string) => {
    setSkills(prev => ({
      ...prev,
      [category]: skillsText.split(',').map(s => s.trim()).filter(s => s)
    }))
  }

  // 타임라인 추가
  const addTimelineItem = () => {
    setTimeline(prev => [...prev, {
      year: '',
      title: '',
      description: '',
      type: 'project'
    }])
  }

  // 타임라인 삭제
  const removeTimelineItem = (index: number) => {
    setTimeline(prev => prev.filter((_, i) => i !== index))
  }

  // 타임라인 업데이트
  const updateTimelineItem = (index: number, field: keyof TimelineItem, value: string) => {
    setTimeline(prev => prev.map((item, i) =>
      i === index ? { ...item, [field]: value } : item
    ))
  }

  // 저장 처리
  const handleSave = () => {
    const profileData = {
      name,
      title,
      bio,
      location,
      email,
      experience,
      githubUrl,
      linkedinUrl,
      skills,
      timeline
    }

    // localStorage에 저장 (백엔드 연동 전까지)
    localStorage.setItem('profileData', JSON.stringify(profileData))
    console.log('저장된 프로필:', profileData)
    alert('프로필이 저장되었습니다!')
  }

  return (
    <div className="p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
      {/* 헤더 */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6 sm:mb-8">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            프로필 설정
          </h1>
          <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base">
            About 페이지에 표시될 정보를 수정하세요
          </p>
        </div>
        <button
          onClick={handleSave}
          className="flex items-center justify-center gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium whitespace-nowrap"
        >
          <Save className="w-4 h-4" />
          <span>저장하기</span>
        </button>
      </div>

      <div className="space-y-6">
        {/* 기본 정보 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            기본 정보
          </h2>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  이름
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  직함
                </label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                자기소개
              </label>
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  위치
                </label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  이메일
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  경력
                </label>
                <input
                  type="text"
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  placeholder="3+ years experience"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>
        </div>

        {/* SNS 링크 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            SNS 링크
          </h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                GitHub URL
              </label>
              <input
                type="url"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                LinkedIn URL
              </label>
              <input
                type="url"
                value={linkedinUrl}
                onChange={(e) => setLinkedinUrl(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>
        </div>

        {/* 기술 스택 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-6">
            기술 스택
          </h2>
          <div className="space-y-4">
            {Object.entries(skills).map(([category, skillList]) => (
              <div key={category}>
                <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                  {category} (쉼표로 구분)
                </label>
                <input
                  type="text"
                  value={skillList.join(', ')}
                  onChange={(e) => updateSkills(category, e.target.value)}
                  placeholder="React, TypeScript, Next.js"
                  className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            ))}
          </div>
        </div>

        {/* 타임라인 */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
              타임라인
            </h2>
            <button
              onClick={addTimelineItem}
              className="flex items-center gap-2 px-3 py-2 text-sm bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>추가</span>
            </button>
          </div>
          <div className="space-y-4">
            {timeline.map((item, index) => (
              <div key={index} className="p-4 border border-slate-200 dark:border-slate-600 rounded-lg">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100">
                    타임라인 항목 {index + 1}
                  </h3>
                  <button
                    onClick={() => removeTimelineItem(index)}
                    className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-300 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      연도
                    </label>
                    <input
                      type="text"
                      value={item.year}
                      onChange={(e) => updateTimelineItem(index, 'year', e.target.value)}
                      placeholder="2025"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      제목
                    </label>
                    <input
                      type="text"
                      value={item.title}
                      onChange={(e) => updateTimelineItem(index, 'title', e.target.value)}
                      placeholder="프로젝트/직장명"
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                      유형
                    </label>
                    <select
                      value={item.type}
                      onChange={(e) => updateTimelineItem(index, 'type', e.target.value)}
                      className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="project">프로젝트</option>
                      <option value="work">직장</option>
                      <option value="education">교육</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
                    설명
                  </label>
                  <textarea
                    value={item.description}
                    onChange={(e) => updateTimelineItem(index, 'description', e.target.value)}
                    rows={2}
                    placeholder="상세 설명을 입력하세요"
                    className="w-full px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileSettings