import React from 'react'
import { Link } from 'react-router'

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center p-4">
      <div className="text-center transform-gpu hover:scale-105 transition-transform duration-500">
        <div className="mb-6  bg-white p-2 rounded-lg shadow-gray-500 drop-shadow-lg inline-block">
          <h1 className='text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-600 font-extrabold'>NotesApp</h1>
        </div>
        <div className="text-9xl font-extrabold text-white mb-4 text-shadow-xl text-shadow-blue-900">404</div>
        <p className="text-2xl text-white mb-8 text-shadow-md">Oops! The page you're looking for can't be found.</p>
        <div className="space-x-4">
          <Link to="/" className="px-6 py-3 bg-white text-indigo-600 rounded-lg hover:bg-opacity-90 transition-all duration-300 shadow-md hover:shadow-lg">
            Go Home
          </Link>
          <Link to="/dashboard" className="px-6 py-3 border-2 border-white text-white rounded-lg hover:bg-white hover:text-indigo-600 transition-all duration-300 shadow-md hover:shadow-lg">
            Dashboard
          </Link>
        </div>
      </div>
    </div>
  )
}

export default PageNotFound