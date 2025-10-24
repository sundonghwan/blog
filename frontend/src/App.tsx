import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "./store/hook";
import Header from "./components/layout/Header";
import Home from "./pages/Home";
import BlogList from "./pages/blog/BlogList";
import Footer from './components/layout/Footer'
import AdminLayout from "./components/layout/AdminLayout";
import BlogDetail from "./pages/blog/BlogDetails";
import ProjectList from "./pages/project/ProjectList";
import ProjectDetail from "./pages/project/ProjectDetail";
import Login from "./pages/auth/Login";
import NotFound from "./pages/NotFound";

import ProtectedRoute from "./routes/ProtectedRoute";
import Dashboard from "./pages/admin/DashBoard";
import PostEditor from "./pages/admin/PostEditor";
import ProjectEditor from "./pages/admin/ProjectEditor";
import PostManage from "./pages/admin/PostManage";
import ProjectManage from "./pages/admin/ProjectManage";
import About from "./pages/about/About";
import ProfileSettings from "./pages/admin/ProfileSettings";

function App() {
  const mode = useAppSelector((state) => state.theme.mode)
  
  useEffect(() => {
    if (mode === 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return (
    <BrowserRouter>
      <Routes>
        {/* ========== 로그인 페이지 (Layout 없음) ========== */}
        <Route path="/login" element={<Login />} />

        {/* ========== 관리자 페이지 (AdminLayout만, Header/Footer 없음) ========== */}
        <Route path="/admin/*" element={
          <ProtectedRoute>
            <AdminLayout>
              <Routes>
                <Route path="/" element={<Dashboard />} />
                <Route path="/posts" element={<PostManage />} />
                <Route path="/posts/new" element={<PostEditor />} />
                <Route path="/posts/:id/edit" element={<PostEditor />} />
                <Route path="/projects" element={<ProjectManage />} />
                <Route path="/projects/new" element={<ProjectEditor />} />
                <Route path="/projects/:id/edit" element={<ProjectEditor />} />
                <Route path="profile" element={<ProfileSettings />} />
              </Routes>
            </AdminLayout>
          </ProtectedRoute>
        } />

        {/* ========== 일반 사용자 페이지 (Header + Footer) ========== */}
        <Route path="/*" element={
          <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 flex flex-col">
            <Header />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/blog" element={<BlogList />} />
                <Route path="/blog/:id" element={<BlogDetail />} />
                <Route path="/projects" element={<ProjectList />} />
                <Route path="/projects/:id" element={<ProjectDetail />} />
                <Route path="/about" element={<About />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}

export default App