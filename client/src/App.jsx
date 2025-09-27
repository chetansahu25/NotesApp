import HomePage from './pages/HomePage'
import LoginForm from './pages/LoginForm'
import { Routes, Route } from 'react-router'
import Dashboard from './components/Dashboard'
import RegisterForm from './pages/RegisterForm'
import { AuthProvider } from './context/authContext'
import ProtectRoutes from './utils/ProtectRoutes'
import UserLayout from './components/Layouts/UserLayout'

import PageNotFound from './pages/PageNotFound'


const App = () => {
  return (
    <div>
      <AuthProvider>
        <Routes>
          <Route index element={<HomePage />} />
          <Route path='/login' element={<LoginForm />} />
          <Route path='/register' element={<RegisterForm />} />

          {/* Authentication Routes */}
          <Route element={<ProtectRoutes setPage='/login' />}>
            <Route element={<UserLayout />}>
              <Route path='/dashboard' element={<Dashboard />} />
            </Route>
          </Route>

          // Catch-all route for undefined paths
          <Route path='*' element={<PageNotFound />} />
        </Routes>
      </AuthProvider>
    </div >
  )
}

export default App