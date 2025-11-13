import React from 'react'
import { Home, MessageCircle, User } from 'lucide-react'
import Logo from './Logo'
import { Link, useLocation } from 'react-router-dom'

const Tab = ({ to, icon: Icon, label }) => {
  const location = useLocation()
  const active = location.pathname === to
  return (
    <Link to={to} className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors ${active ? 'bg-white/70 text-rose-600 shadow' : 'hover:bg-white/50 text-rose-500'}`}>
      <Icon size={18} />
      <span className="text-sm font-medium">{label}</span>
    </Link>
  )
}

function NavBar() {
  return (
    <div className="sticky top-0 z-20 backdrop-blur bg-gradient-to-r from-pink-50/70 via-rose-50/70 to-purple-50/70 border-b border-white/40">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <Logo />
        <div className="flex items-center gap-2">
          <Tab to="/home" icon={Home} label="Home" />
          <Tab to="/chats" icon={MessageCircle} label="Chats" />
          <Tab to="/profile" icon={User} label="Profile" />
        </div>
      </div>
    </div>
  )
}

export default NavBar
