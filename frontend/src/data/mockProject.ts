// src/data/mockProjects.ts
export interface Project {
  id: number
  title: string
  description: string
  detailContent?: string
  thumbnail: string
  images?: string[]
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

export const mockProjects: Project[] = [
  {
    id: 1,
    title: '기술 블로그 플랫폼',
    description: 'React, TypeScript, FastAPI를 사용한 개인 기술 블로그. Markdown 에디터, 다크모드, 검색 기능을 지원합니다.',
    detailContent: `
# 기술 블로그 프로젝트

React와 FastAPI를 사용하여 만든 개인 기술 블로그입니다.

## 주요 기능

- Markdown 기반 포스트 작성
- 다크모드 지원
- 검색 및 필터링
- 반응형 디자인

## 기술적 도전

TypeScript를 처음 사용하면서 타입 안정성을 확보했습니다.
    `,
    thumbnail: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&h=500&fit=crop',
    techStack: ['React', 'TypeScript', 'FastAPI', 'PostgreSQL', 'Tailwind CSS', 'AWS'],
    role: 'Full-stack Developer',
    teamSize: 1,
    githubUrl: 'https://github.com/yourusername/tech-blog',
    liveUrl: 'https://yourblog.com',
    startDate: '2025-10',
    status: 'in-progress',
    featured: true
  },
  {
    id: 2,
    title: 'E-Commerce 플랫폼',
    description: '온라인 쇼핑몰 플랫폼. 상품 관리, 장바구니, 결제 시스템을 구현했습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=500&fit=crop',
    techStack: ['Next.js', 'Node.js', 'MongoDB', 'Stripe', 'Docker'],
    role: 'Frontend Developer',
    teamSize: 4,
    githubUrl: 'https://github.com/yourusername/ecommerce',
    liveUrl: 'https://yourshop.com',
    startDate: '2025-06',
    endDate: '2025-09',
    status: 'completed',
    featured: true
  },
  {
    id: 3,
    title: 'Todo 관리 앱',
    description: '간단한 Todo 리스트 관리 애플리케이션. 드래그 앤 드롭, 카테고리 분류 기능.',
    thumbnail: 'https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=500&fit=crop',
    techStack: ['React', 'Redux', 'Firebase'],
    role: 'Solo Developer',
    teamSize: 1,
    githubUrl: 'https://github.com/yourusername/todo-app',
    liveUrl: 'https://yourtodo.com',
    startDate: '2025-03',
    endDate: '2025-04',
    status: 'completed',
    featured: false
  },
  {
    id: 4,
    title: 'Real-time Chat Application',
    description: '실시간 채팅 애플리케이션. WebSocket을 활용한 실시간 통신 구현.',
    thumbnail: 'https://images.unsplash.com/photo-1611606063065-ee7946f0787a?w=800&h=500&fit=crop',
    techStack: ['React', 'Socket.io', 'Express', 'MongoDB'],
    role: 'Full-stack Developer',
    teamSize: 2,
    githubUrl: 'https://github.com/yourusername/chat-app',
    startDate: '2024-12',
    endDate: '2025-02',
    status: 'completed',
    featured: false
  },
  {
    id: 5,
    title: 'Weather Dashboard',
    description: '날씨 정보 대시보드. 여러 도시의 날씨를 한눈에 확인할 수 있습니다.',
    thumbnail: 'https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&h=500&fit=crop',
    techStack: ['Vue.js', 'Chart.js', 'OpenWeather APßI'],
    role: 'Frontend Developer',
    teamSize: 1,
    githubUrl: 'https://github.com/yourusername/weather-dashboard',
    liveUrl: 'https://yourweather.com',
    startDate: '2024-10',
    endDate: '2024-11',
    status: 'completed',
    featured: false
  },
  {
    id: 6,
    title: 'Portfolio CMS',
    description: 'Headless CMS를 활용한 포트폴리오 사이트 생성기.',
    thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=500&fit=crop',
    techStack: ['Next.js', 'Strapi', 'GraphQL', 'Vercel'],
    role: 'Full-stack Developer',
    teamSize: 3,
    githubUrl: 'https://github.com/yourusername/portfolio-cms',
    startDate: '2024-08',
    status: 'archived',
    featured: false
  }
]