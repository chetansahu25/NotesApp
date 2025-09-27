import React from 'react'
import TopNav from '../TopNav'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <div>
        <TopNav />
        <Sidebar /> 
        <Outlet />
    </div>
  )
}

export default UserLayout