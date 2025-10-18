import {Link, useLocation} from "react-router-dom";
import { Moon, Sun, Search, Menu } from 'lucide-react'
import { useAppDispatch, useAppSelector } from "../../store/hook"; 
import { toggleTheme } from "../../store/slices/themeSlice";


const Header = () => {
    const location = useLocation();
    const dispatch = useAppDispatch();
    const mode = useAppSelector((state) => state.theme.mode);

    const isActive = (path: string) => {
        return location.pathname === path ? 'text-blue-500' : 'hover:text-blue-500';
    }
    const handleThemeToggle = () => {
        dispatch(toggleTheme())  // toggleTheme 액션 실행
    }

    const navItems = [
        { path: '/', label: 'Home' },
        { path: '/about', label: 'About' },
        { path: '/projects', label: 'Projects' },
        { path: '/about', label: 'about' }
    ]

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 dark:border-slate-700">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex h-16 items-center justify-between">
                    <Link to="/" className="text-2xl font-bold">
                        <span className="text-2xl font-bold text-gray-600 dark:text-slate-200">
                            TechBlog
                        </span>
                    </Link>
                    <nav className="hidden md:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                className={`
                                px-4 py-2 text-sm hover:font-bold hover:text-gray-900 transition-colors
                                ${isActive(item.path)
                                    ? 'text-gray-600 dark:text-slate-200'
                                    : 'text-gray-600 dark:text-slate-300 hover:bg-slate-100'
                                }
                                `}
                            >
                                {item.label}
                            </Link>
                        ))}
                    </nav>

                    <div>
                        <button 
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Search"
                        >
                            <Search className="h-5 w-5" />
                        </button>
                        <button
                        onClick={handleThemeToggle}
                        className="p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Toggle theme"
                        >
                            {/* 조건부 렌더링: mode에 따라 다른 아이콘 */}
                            {mode === 'light' ? (
                                <Moon className="h-5 w-5" />
                            ) : (
                                <Sun className="h-5 w-5" />
                            )}
                        </button>

                        <button
                        className="md:hidden p-2 rounded-lg text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                        aria-label="Menu"
                        >
                        <Menu className="h-5 w-5" />
                        </button>
                    </div>
                </div>
            </div>
        </header>
    )
}


export default Header