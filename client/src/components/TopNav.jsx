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
    <div className=' absolute right-0 w-5/6 flex gap-5 items-center justify-between px-10 z-10 border-b h-15  '>
      <div >
        <span className='font-semibold'>
        Welcome {name} !
        </span>
      </div>
      <div className='flex gap-5'>

      <span className=' flex items-center justify-center gap-2 p-2 rounded-full border-2 font-bold hover:bg-red-400 cursor-pointer hover:scale-105 duration-200'>
        <LogOut onClick={handleLogout}  />
        Logout
      </span>
      </div>
    </div>
  )
}

export default TopNav