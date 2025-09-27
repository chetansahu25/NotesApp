import  { useEffect, useState } from 'react'
import Logo from '../components/Logo'
import { EyeOff, Eye, Mail, AlertCircle } from 'lucide-react'
import {Link, useNavigate } from 'react-router'
import { useAuth } from '../context/authContext'


const LoginForm = () => {

  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState("")
  const {  user, isAuthenticated, login } = useAuth()

  const handleChange = (e) => {
    
    const { name, value } = e.target   
    setFormData(prev => ({
      ...prev,
      [name]: value.trim()
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsLoading(true)

    //Validation
    const emailRegex =  /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const data = emailRegex.test(formData.email) 

    if(!data){
      setFormError("Kindly Enter A Valid Email")
      setIsLoading(false)
      return
    }


    try {
      const response = await login(formData)
      console.log(response)
    } catch (error) {
      if(error.status === 401){
        console.log("not auth")
        setFormError(error.response.data.error)        
      } 
      if(error.status === 500){
        setFormError(error.response.data.error)        
      }         
    }      
    setIsLoading(false)
  }

  useEffect(() => {
   if (isAuthenticated) {
    navigate('/dashboard')
   }
    
  }, [isAuthenticated])

  return (
    <div className=" min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center p-4">

      {/* Login Form */}
      <div className="bg-white rounded-2xl shadow-xl p-8 animate-slide-up w-lg">
        <div className="w-full max-w-md">
          {/* Logo/Brand Section */}
          <div className="text-center mb-8 animate-fade-in">
            <div className='mb-3'>
              <Logo />
            </div>
            <p className="text-slate-600">Sign in to your account</p>
                {formError? (<div className='flex items-center justify-center gap-2 mt-5 text-red-400 px-5 py-2 rounded-lg bg-red-100 font-semibold'>
                  <AlertCircle size={20} />
                    {formError}
                    
                </div> ) : (
                  <div></div>                  
                )
                }
          </div>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Email Field */}
            <div className="space-y-1">
              <label htmlFor="email" className="text-sm font-medium text-slate-700 block">
                Email address
              </label>
              <div className="relative ">
                <input
                  id="email"
                  name="email"
                  type="text"
                  required
                  formNoValidate
                  value={formData.email}
                  onChange={handleChange}
                  className=" peer w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white"
                  placeholder="Enter your email"
                />
                <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 peer-focus:text-black ">
                  <Mail  />
                </div>
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-1">
              <label htmlFor="password" className="text-sm font-medium text-slate-700 block">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  formNoValidate
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-slate-50 focus:bg-white pr-12"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 transition-colors"
                >
                  {showPassword ? (
                    <Eye />
                  ) : (
                    <EyeOff />
                  )}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 border-slate-300 rounded focus:ring-blue-500 focus:ring-2"
                />
                <span className="ml-2 text-sm text-slate-600">Remember me</span>
              </label>
              <a href="#" className="text-sm text-blue-600 hover:text-blue-700 font-medium transition-colors">
                Forgot password?
              </a>
            </div>
            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 px-4 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
            >
              {isLoading ? (
                <div className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Signing in...
                </div>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
          {/* Divider Line */}
          <div className="mt-6 mb-8 border-b border-slate-200"></div> {/* Divider Line */}
          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-sm text-slate-600">
              Don't have an account?{' '}
              <Link to={'/register'} className="font-medium text-blue-600 hover:text-blue-700 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LoginForm