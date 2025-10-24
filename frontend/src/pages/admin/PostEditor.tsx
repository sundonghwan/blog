// src/pages/Admin/PostEditor.tsx
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import { Save, Eye, EyeOff, Upload } from 'lucide-react'

const PostEditor = () => {
  const navigate = useNavigate()

  // 폼 상태
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [category, setCategory] = useState('React')
  const [tags, setTags] = useState('')
  const [coverImage, setCoverImage] = useState('')
  const [published, setPublished] = useState(false)

  // 미리보기 토글
  const [showPreview, setShowPreview] = useState(false)

  // 카테고리 목록
  const categories = ['React', 'TypeScript', 'Backend', 'DevOps', 'Database']

  // 저장 처리 (Mock)
  const handleSave = (isPublish: boolean) => {
    const newPost = {
      id: Date.now(),
      title,
      content,
      excerpt,
      category,
      tags: tags.split(',').map(t => t.trim()),
      coverImage,
      published: isPublish,
      createdAt: new Date().toISOString().split('T')[0],
      readTime: Math.ceil(content.split(' ').length / 200),
      viewCount: 0
    }

    console.log('저장된 포스트:', newPost)
    alert(isPublish ? '포스트가 발행되었습니다!' : '임시저장되었습니다!')
    navigate('/admin/posts')
  }

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* 헤더 */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
            새 포스트 작성
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Markdown 형식으로 포스트를 작성하세요
          </p>
        </div>

        {/* 액션 버튼 */}
        <div className="flex gap-2">
          <button
            onClick={() => setShowPreview(!showPreview)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors"
          >
            {showPreview ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            <span>{showPreview ? '편집' : '미리보기'}</span>
          </button>
          <button
            onClick={() => handleSave(false)}
            className="flex items-center gap-2 px-4 py-2 bg-slate-600 text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            <span>임시저장</span>
          </button>
          <button
            onClick={() => handleSave(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            <Upload className="w-4 h-4" />
            <span>발행하기</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* 왼쪽: 에디터 */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* 제목 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              제목
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="포스트 제목을 입력하세요"
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 요약 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              요약 (150자 이내)
            </label>
            <textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="포스트 요약을 입력하세요"
              maxLength={150}
              rows={2}
              className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
            />
            <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
              {excerpt.length}/150
            </p>
          </div>

          {/* 본문 에디터 / 미리보기 */}
          <div>
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-2">
              본문
            </label>
            
            {!showPreview ? (
              /* 에디터 모드 */
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="# 제목&#10;&#10;Markdown 형식으로 작성하세요..."
                rows={20}
                className="w-full px-4 py-3 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm resize-none"
              />
            ) : (
              /* 미리보기 모드 */
              <div className="border border-slate-300 dark:border-slate-600 rounded-lg p-6 bg-white dark:bg-slate-800 min-h-[500px]">
                <div className="markdown-content text-slate-900 dark:text-slate-100">
                  <ReactMarkdown remarkPlugins={[remarkGfm]}>
                    {content || '*미리보기할 내용이 없습니다*'}
                  </ReactMarkdown>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* 오른쪽: 메타 정보 */}
        <div className="space-y-6">
          
          {/* 카테고리 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              카테고리
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          {/* 태그 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              태그
            </label>
            <input
              type="text"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="React, TypeScript (쉼표로 구분)"
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* 썸네일 */}
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg border border-slate-200 dark:border-slate-700">
            <label className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-3">
              썸네일 이미지 URL
            </label>
            <input
              type="text"
              value={coverImage}
              onChange={(e) => setCoverImage(e.target.value)}
              placeholder="https://..."
              className="w-full px-4 py-2 border border-slate-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {coverImage && (
              <img
                src={coverImage}
                alt="썸네일 미리보기"
                className="mt-3 w-full h-32 object-cover rounded-lg"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostEditor