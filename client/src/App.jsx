import HomePage from './src/pages/Homepage.jsx'
import LoginForm from './src/pages/LoginForm.jsx'
import { Routes, Route } from 'react-router'
import DeletedNotes from './src/pages/DeletedNotes.jsx'
import Dashboard from './src/components/Dashboard.jsx'
import RegisterForm from './src/pages/RegisterForm.jsx'
import { AuthProvider } from './src/context/authContext.jsx'
import ProtectRoutes from './src/utils/ProtectRoutes.jsx'
import UserLayout from './src/components/Layouts/UserLayout.jsx'

import PageNotFound from './src/pages/PageNotFound.jsx'


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