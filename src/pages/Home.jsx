import React, { useEffect, useState } from 'react'
import NavBar from '../components/NavBar'
import GradientBg from '../components/GradientBg'

export default function Home(){
  const [profile, setProfile] = useState(null)
  const user = JSON.parse(localStorage.getItem('roomance_user') || 'null')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const fetchNext = async () => {
    if(!user) return
    const res = await fetch(`${baseUrl}/profiles/next?user_id=${user.user_id}`)
    const data = await res.json()
    setProfile(data)
  }

  const act = async (action) => {
    if(!user || !profile?.id) return
    await fetch(`${baseUrl}/profiles/like`, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: user.user_id, target_id: profile.id, action })
    })
    fetchNext()
  }

  useEffect(()=>{ fetchNext() }, [])

  return (
    <GradientBg>
      <NavBar />
      <div className="max-w-3xl mx-auto px-4 py-10">
        {profile && profile.id ? (
          <div className="bg-white/80 backdrop-blur rounded-3xl shadow-xl border border-white/50 p-6 text-center">
            <div className="w-56 h-56 mx-auto rounded-3xl overflow-hidden shadow-lg">
              <img src={profile.photos?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=800&auto=format&fit=crop'} alt="pfp" className="w-full h-full object-cover" />
            </div>
            <h2 className="mt-4 text-2xl font-extrabold text-rose-600">{profile.nickname}{profile.age ? `, ${profile.age}` : ''}</h2>
            <p className="mt-1 text-rose-500">{profile.bio}</p>
            <div className="mt-3 flex flex-wrap justify-center gap-2">
              {profile.tags?.map(t => (
                <span key={t} className="px-3 py-1 rounded-full bg-rose-50 text-rose-500 text-sm shadow-sm">{t}</span>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <button onClick={()=>act('dislike')} className="w-14 h-14 rounded-full bg-white text-rose-500 border border-rose-200 shadow hover:scale-105 transition">💔</button>
              <button onClick={()=>act('like')} className="w-16 h-16 rounded-full bg-gradient-to-br from-rose-400 to-pink-400 text-white text-xl shadow hover:scale-105 transition">❤️</button>
              <button onClick={()=>{}} className="w-14 h-14 rounded-full bg-white text-rose-500 border border-rose-200 shadow hover:scale-105 transition">💬</button>
            </div>
          </div>
        ) : (
          <div className="bg-white/70 rounded-3xl p-10 text-center text-rose-500">No more profiles right now. Check back later!</div>
        )}
      </div>
    </GradientBg>
  )
}
