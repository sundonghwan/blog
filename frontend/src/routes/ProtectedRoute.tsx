
// src/routes/ProtectedRoute.tsx
import { Navigate } from 'react-router-dom'

interface ProtectedRouteProps {
  children: React.ReactNode  // 보호할 컴포넌트
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  // localStorage에서 인증 상태 확인
  const isAdmin = localStorage.getItem('isAdmin') === 'true'

  // 인증되지 않았으면 로그인 페이지로 리다이렉트
  if (!isAdmin) {
    return <Navigate to="/login" replace />
  }

  // 인증되었으면 children 렌더링
  return <>{children}</>
}

export default ProtectedRoute