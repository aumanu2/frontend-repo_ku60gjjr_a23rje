import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import GradientBg from '../components/GradientBg'

export default function Profile(){
  const user = JSON.parse(localStorage.getItem('roomance_user') || 'null')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [me, setMe] = useState(null)

  const load = async () => {
    if(!user) return
    const res = await fetch(`${baseUrl}/profile/me?user_id=${user.user_id}`)
    if(res.ok){
      setMe(await res.json())
    }
  }

  useEffect(()=>{ load() }, [])

  const logout = () => {
    localStorage.removeItem('roomance_user')
    window.location.href = '/'
  }

  return (
    <GradientBg>
      <NavBar />
      <div className="max-w-4xl mx-auto px-4 py-10">
        {me ? (
          <div className="bg-white/80 rounded-3xl border border-white/50 shadow p-6">
            <div className="flex items-start gap-6">
              <img src={me.photos?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=600&auto=format&fit=crop'} className="w-36 h-36 rounded-3xl object-cover" />
              <div>
                <h2 className="text-2xl font-extrabold text-rose-600">{me.nickname}{me.age?`, ${me.age}`:''}</h2>
                <p className="text-rose-500 mt-1">{me.bio}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {me.tags?.map(t => <span key={t} className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-sm shadow-sm">{t}</span>)}
                </div>
              </div>
            </div>
            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              <button className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">Edit Profile</button>
              <button className="px-4 py-2 rounded-xl bg-rose-50 text-rose-600 border border-rose-200">Profile Settings</button>
              <button onClick={logout} className="px-4 py-2 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-white">Logout</button>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 rounded-3xl p-10 text-center text-rose-500">No profile found. Complete details first.</div>
        )}
      </div>
    </GradientBg>
  )
}
