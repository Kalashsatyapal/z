import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div className="w-screen h-screen flex flex-col bg-gradient-to-br from-blue-400 via-indigo-500 to-purple-600">
      {/* Topbar */}
      <header className="w-full flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md shadow-lg">
        <h1 className="text-3xl font-extrabold text-indigo-700">Zmart</h1>
        <Link to="/admin">
          <button className="px-6 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-semibold rounded-full shadow-md hover:shadow-xl hover:scale-105 active:scale-95 transition-all duration-300">
            Admin Panel
          </button>
        </Link>
      </header>
    </div>
  )
}
