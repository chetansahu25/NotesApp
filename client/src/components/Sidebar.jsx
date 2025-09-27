import Logo from './Logo'
import { LayoutDashboard, PanelLeftClose, PanelLeftOpen, Link, ChevronRight, Menu, ChartNoAxesCombined } from 'lucide-react'
import { NavLink, useNavigate } from 'react-router'
import { useAuth } from '../context/authContext'
import { useState, useEffect } from 'react'

const Sidebar = () => {
    const [profileOptions, setProfileOptions] = useState(false)
    const [isSidebarOpen, setIsSidebarOpen] = useState(true)
    const [isMobile, setIsMobile] = useState(window.innerWidth <= 768)
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate();

    useEffect(() => {
        const handleResize = () => {
            const mobile = window.innerWidth <= 768
            setIsMobile(mobile)
            setIsSidebarOpen(!mobile)
        }

        window.addEventListener('resize', handleResize)
        return () => window.removeEventListener('resize', handleResize)
    }, [])

    if(!isAuthenticated){
        navigate("/");
    }

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    return (
        <>
            {/* Mobile Menu Button */}
            <button 
                className="md:hidden fixed top-4 left-4 z-50 p-2 rounded-md bg-gray-100 hover:bg-gray-200"
                onClick={toggleSidebar}
            >
                <Menu size={24} />
            </button>

            {/* Overlay for mobile */}
            {isMobile && isSidebarOpen && (
                <div 
                    className="fixed inset-0 bg-black bg-opacity-50 z-30"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside className={`
                ${isMobile && !isSidebarOpen ? '-translate-x-full' : 'translate-x-0'}
                fixed left-0 z-40 h-screen bg-white
                transition-all duration-300 ease-in-out
                ${isSidebarOpen ? 'w-72 md:w-64 lg:w-72' : 'w-20'}
                border-r border-gray-300
            `}>
                <div className='flex justify-between items-center px-4 py-3 border-b border-gray-300'>
                    {isSidebarOpen ? (
                        <Logo />
                    ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">
                            N
                        </div>
                    )}
                    <button 
                        onClick={toggleSidebar}
                        className="hidden md:flex items-center justify-center w-8 h-8 hover:bg-gray-100 rounded-lg transition-colors"
                    >
                        {isSidebarOpen ? <PanelLeftClose size={20} /> : <PanelLeftOpen size={20} />}
                    </button>
                </div>

                <nav className='p-1 flex flex-col gap-1'>
                    <NavLink 
                        to='/dashboard'
                        className={({isActive}) => `
                            flex items-center gap-3 px-3 py-2 
                            hover:bg-gray-100 rounded-lg transition-colors
                            ${isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}
                            ${!isSidebarOpen && '!justify-center'}
                        `}
                        title="Dashboard"
                    >
                        <LayoutDashboard size={20} />
                        {isSidebarOpen && (
                            <span className="font-semibold">
                                Dashboard
                            </span>
                        )}
                    </NavLink>

                    <NavLink 
                        to='/deleted-notes'
                        className={({isActive}) => `
                            flex items-center gap-3 px-3 py-2 
                            hover:bg-gray-100 rounded-lg transition-colors
                            ${isActive ? 'bg-gray-100 text-blue-600' : 'text-gray-700'}
                            ${!isSidebarOpen && '!justify-center'}
                        `}
                        title="Deleted Notes"
                    >
                        <ChartNoAxesCombined size={20} />
                        {isSidebarOpen && (
                            <span className="font-semibold">
                                Deleted Notes
                            </span>
                        )}
                    </NavLink>
                </nav>

                <div className='absolute bottom-0 w-full border-t border-gray-300'>
                    <div className={`
                        flex items-center gap-3 p-4 hover:bg-gray-100 cursor-pointer
                        ${!isSidebarOpen && 'justify-center'}
                    `}>
                        <img 
                            src={`https://ui-avatars.com/api/?name=${user?.name ? user.name : "User"}&background=random&font-size=0.5&bold=true&uppercase=true&format=svg&rounded=true`}
                            className="w-10 h-10 flex-shrink-0"
                            alt="User avatar"
                        />
                        {isSidebarOpen && (
                            <>
                                <div className='flex-1 min-w-0'>
                                    <p className='font-semibold text-sm truncate'>{user?.email}</p>
                                    <p className='text-gray-600 text-xs'>Free</p>
                                </div>
                                <button 
                                    onClick={() => setProfileOptions(!profileOptions)}
                                    className={`transition-transform duration-300 ${profileOptions ? 'rotate-90' : ''}`}
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    )
}

export default Sidebar