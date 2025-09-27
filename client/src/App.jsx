import HomePage from './pages/HomePage.jsx'
import LoginForm from './pages/LoginForm.jsx'
import { Routes, Route } from 'react-router'
import DeletedNotes from './pages/DeletedNotes.jsx'
import Dashboard from './components/Dashboard.jsx'
import RegisterForm from './pages/RegisterForm.jsx'
import { AuthProvider } from './context/authContext.jsx'
import ProtectRoutes from './utils/ProtectRoutes.jsx'
import UserLayout from './components/Layouts/UserLayout.jsx'

import PageNotFound from './pages/PageNotFound.jsx'


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
              <Route path='/deleted-notes' element={<DeletedNotes />}/>
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