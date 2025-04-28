import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom'
import Home from './pages/Home'
import AdminLayout from './pages/admin/AdminLayout'
import AdminDashboard from './pages/admin/AdminDashboard'
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  )
}

function AdminRoutes() {
  return (
    <>
      <SignedOut>
        <SignIn />
      </SignedOut>
      <SignedIn>
        <AdminLayout>
          <Routes>
            <Route path="/" element={<AdminDashboard />} />
          </Routes>
        </AdminLayout>
      </SignedIn>
    </>
  )
}

export default App
