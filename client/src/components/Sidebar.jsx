import Logo from './Logo'
import { LayoutDashboard, PanelLeftClose, PanelLeftOpen, ChartNoAxesCombined, Link, ChevronRightSquare, ChevronRight } from 'lucide-react'
import { NavLink, useNavigate, } from 'react-router'
import { useAuth } from '../context/authContext'
import { useState } from 'react'


const Sidebar = () => {
    const [profileOptions, setProfileOptions] = useState(false)
    const { user, isAuthenticated } = useAuth()
    const navigate = useNavigate();
    if(!isAuthenticated){
        navigate("/");
    }
    return (
        <div>
            <aside className='w-1/6 border border-l-2 border-gray-300 h-screen fixed left-0 z-100 bg-white'>
                <div className='flex justify-between px-2 pb-3 items-center my-2 mx-3 py-2  border-b border-gray-300'>
                    <span>
                        <Logo />
                    </span>
                    <span className='flex items-center'><PanelLeftClose /></span>
                </div>
                <nav className=' p-1 flex flex-col *:font-semibold text-left *:px-3 *:py-2 *:hover:rounded-lg *:hover:bg-gray-400 **:flex **:items-center **:gap-3'>

                    <NavLink to={'/dashboard'} >
                    <LayoutDashboard />
                        Dashboard
                    </NavLink>

                    <NavLink to={'/analytics'} >
                    <ChartNoAxesCombined />
                    
                        Analytics
                    </NavLink>

                    <NavLink to={'/shortlinks'} >
                    <Link />
                        Manage Links
                    </NavLink>
                </nav>
                <div className='absolute flex items-center gap-3 px-2 h-20 hover:bg-gray-400 bottom-0 border-t-2 border-gray-300 w-full pt-5 cursor-pointer'>
                    {/* user Logo and info */}
                    <img src={`https://ui-avatars.com/api/?name=${ user?.name ? user.name : "User" }&background=random&font-size=0.5&bold=true&uppercase=true&format=svg&rounded=true`} width={60} />                    
                    <div className='flex  flex-col justify-center'>

                        <p className='font-bold text-sm '>{user?.email}</p>
                        <p className=' text-gray-600 text-xs'>Free</p>
                    </div>
                    <div onClick={()=>setProfileOptions((prev)=> !prev)}>
                    <ChevronRight />

                    </div>
                    

                </div>
            </aside>
        </div>
    )
}

export default Sidebar