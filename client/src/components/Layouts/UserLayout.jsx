import React from 'react'
import TopNav from '../TopNav'
import Sidebar from '../Sidebar'
import { Outlet } from 'react-router'

const UserLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <TopNav />
      <Sidebar />
      <main className="transition-all duration-300 md:ml-64 lg:ml-72 pt-16 min-h-screen">
        <div className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </div>
      </main>
    </div>
  )
}

export default UserLayout