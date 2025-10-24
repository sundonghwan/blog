// src/data/mockPosts.ts
interface Post {
  id: number
  title: string
  excerpt: string
  content?: string
  coverImage: string
  category: string
  tags: string[]
  createdAt: string
  readTime: number
  viewCount?: number
}

export const mockPosts: Post[] = [
  {
    id: 1,
    title: 'React와 TypeScript로 블로그 만들기',
    excerpt: 'Vite, React, TypeScript, Tailwind CSS를 활용해서 모던한 블로그를 만드는 과정을 소개합니다.',
    content: `
# React와 TypeScript로 블로그 만들기

React와 TypeScript를 사용하여 현대적인 블로그를 만드는 방법을 알아봅시다.

## 사용 기술

- **React 18**: 최신 React 기능 활용
- **TypeScript**: 타입 안정성
- **Vite**: 빠른 개발 서버
- **Tailwind CSS**: 유틸리티 CSS

## 시작하기

먼저 프로젝트를 생성합니다:

\`\`\`bash
npm create vite@latest my-blog -- --template react-ts
cd my-blog
npm install
\`\`\`

### 컴포넌트 구조

기본적인 컴포넌트 구조는 다음과 같습니다:

\`\`\`typescript
interface Post {
  id: number
  title: string
  content: string
}

const BlogPost = ({ post }: { post: Post }) => {
  return <article>{post.title}</article>
}
\`\`\`

## 결론

React와 TypeScript를 사용하면 타입 안전한 블로그를 만들 수 있습니다!
    `,
    coverImage: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=800&h=400&fit=crop',
    category: 'React',
    tags: ['React', 'TypeScript', 'Tailwind'],
    createdAt: '2025-10-10',
    readTime: 5,
    viewCount: 1234
  },
  {
    id: 2,
    title: 'FastAPI로 RESTful API 구축하기',
    excerpt: 'Python FastAPI를 사용하여 빠르고 효율적인 백엔드 API를 만드는 방법을 알아봅니다.',
    content: `
# FastAPI로 RESTful API 구축하기

Python의 FastAPI 프레임워크를 사용하여 RESTful API를 만들어봅시다.

## FastAPI란?

FastAPI는 Python 3.7+의 타입 힌트를 기반으로 한 현대적이고 빠른 웹 프레임워크입니다.

### 주요 특징

- ⚡ **빠른 성능**: NodeJS, Go와 비슷한 수준
- 🎯 **타입 안전**: Pydantic 기반
- 📝 **자동 문서화**: Swagger UI 자동 생성

## 설치하기

\`\`\`bash
pip install fastapi uvicorn
\`\`\`

## 첫 API 만들기

\`\`\`python
from fastapi import FastAPI

app = FastAPI()

@app.get("/")
def read_root():
    return {"Hello": "World"}
\`\`\`

간단하죠? FastAPI는 정말 사용하기 쉽습니다!
    `,
    coverImage: 'https://images.unsplash.com/photo-1629654297299-c8506221ca97?w=800&h=400&fit=crop',
    category: 'Backend',
    tags: ['Python', 'FastAPI', 'API'],
    createdAt: '2025-10-08',
    readTime: 8,
    viewCount: 856
  },
  {
    id: 3,
    title: 'AWS로 서비스 배포하기',
    excerpt: 'S3, CloudFront, ECS를 활용하여 프론트엔드와 백엔드를 AWS에 배포하는 과정을 정리했습니다.',
    content: `
# AWS로 서비스 배포하기

AWS를 사용하여 실제 서비스를 배포하는 방법을 알아봅시다.

## AWS 서비스 구성

### 프론트엔드
- **S3**: 정적 파일 호스팅
- **CloudFront**: CDN

### 백엔드
- **ECS Fargate**: 컨테이너 실행
- **RDS**: 데이터베이스

## S3 배포하기

\`\`\`bash
# 빌드
npm run build

# S3 업로드
aws s3 sync ./dist s3://my-bucket --delete
\`\`\`

## CloudFront 설정

CloudFront를 통해 HTTPS와 빠른 속도를 제공할 수 있습니다.

> 💡 **Tip**: CloudFront 캐시 무효화를 잊지 마세요!

배포 완료! 🚀
    `,
    coverImage: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=400&fit=crop',
    category: 'DevOps',
    tags: ['AWS', 'S3', 'CloudFront'],
    createdAt: '2025-10-05',
    readTime: 10,
    viewCount: 2103
  }
]