import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import { SignIn, SignedIn, SignedOut } from '@clerk/clerk-react';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin/*" element={<AdminRoutes />} />
      </Routes>
    </Router>
  );
}

function AdminRoutes() {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 animate-fadeIn flex items-center justify-center p-6">
      
      <SignedOut>
        <div className="w-full h-full flex items-center justify-center">
          <div className="bg-white w-full max-w-4xl min-h-[500px] p-10 rounded-3xl shadow-2xl flex flex-col justify-center hover:scale-105 transition duration-500 ease-in-out">
            <h1 className="text-4xl font-bold text-center text-indigo-600 mb-8">Admin Login</h1>
            <SignIn path="/admin/sign-in" routing="path" />
          </div>
        </div>
      </SignedOut>

      <SignedIn>
        <div className="w-full min-h-screen bg-white overflow-hidden">
          <AdminLayout>
            <Routes>
              <Route path="/" element={<AdminDashboard />} />
            </Routes>
          </AdminLayout>
        </div>
      </SignedIn>
      
    </div>
  );
}

export default App;
