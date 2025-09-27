import React from 'react'
import { useNavigate } from 'react-router'

const Homepage = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  }
  const handleSignup = () => {
    navigate('/register');
  }

  return (
    <div className=' h-screen w-full flex flex-col justify-center items-center bg-gradient-to-b from-blue-500 to-purple-600 text-white'>
      <h1 className='text-5xl font-bold mb-4'>Welcome to the Notes App</h1>
      <p className='text-lg mb-8'>Your one-stop solution for note-taking and team collaboration.</p>
      <div className='flex gap-10'>

      <button onClick={handleSignup} className='bg-white text-blue-500 font-bold px-4 py-2 rounded shadow-lg hover:bg-yellow-200 cursor-pointer'>
        Signup
      </button>
      <button onClick={handleLogin} className='bg-white text-blue-500 font-bold px-4 py-2 rounded shadow-lg hover:bg-yellow-200 cursor-pointer'>
        Login
      </button>
      </div>
    </div>
    
  )
}

export default Homepage