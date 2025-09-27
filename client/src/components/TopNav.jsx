import { Bell, EllipsisVertical, LogOut } from 'lucide-react'
import { useAuth } from '../context/authContext'
import { useNavigate } from 'react-router'

const TopNav = () => {
  const { user, logout } = useAuth()
  const name = user?.name ? user.name : "user"
  const navigate = useNavigate()
  const handleLogout = async() => {
    //logout function
    
    await logout()
    navigate("/")
  }

  return (
    <nav className="fixed top-0 right-0 left-0 md:left-64 lg:left-72 bg-white border-b border-gray-200 z-20">
      <div className="flex items-center justify-between px-4 md:px-6 lg:px-8 h-16">
        <div className="flex items-center">
          <span className="font-semibold text-sm md:text-base">
            Welcome {name}!
          </span>
        </div>
        <div className="flex items-center gap-2 md:gap-4">
          <button 
            onClick={handleLogout}
            className="flex items-center gap-2 px-3 py-2 text-sm rounded-lg border border-gray-300 text-gray-700 hover:bg-red-50 hover:text-red-600 hover:border-red-200 transition-colors duration-200"
          >
            <LogOut size={18} />
            <span className="hidden md:inline">Logout</span>
          </button>
        </div>
      </div>
    </nav>
  )
}

export default TopNav