import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "./store/hook";
import Header from "./components/layout/Header";
import Home from "./pages/Home";

function App() {
  const mode = useAppSelector((state) => state.theme.mode)
  useEffect(() => {
    if (mode == 'dark') {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [mode])

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors">
        <Header />
        <Routes>
          <Route path="/" element={
            <Home />
          } />
          
          <Route path="/blog" element={
            <div className="p-8">Blog 페이지</div>
          } />
          
          <Route path="/projects" element={
            <div className="p-8">Projects 페이지</div>
          } />
          
          <Route path="/about" element={
            <div className="p-8">About 페이지</div>
          } />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App