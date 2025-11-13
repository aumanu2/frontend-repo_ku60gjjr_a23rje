import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import GradientBg from '../components/GradientBg'
import Logo from '../components/Logo'

const TAGS = ['Early Bird','Night Owl','Nerd','Back Bencher','Stay-at-Home','Outgoing','Sporty','Lazy','Coffee Lover','Gym Freak','Gamer','Bookworm','Movie Buff','Party Animal','Artist','Foodie','Pet Lover','Traveler','Music Addict','Deep Thinker','Meme Lord','Fashionista','Workaholic','Introvert','Extrovert']

export default function Details(){
  const nav = useNavigate()
  const [nickname, setNickname] = useState('')
  const [bio, setBio] = useState('')
  const [age, setAge] = useState('')
  const [tags, setTags] = useState([])
  const [photos, setPhotos] = useState([null, null])
  const [loading, setLoading] = useState(false)

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const user = JSON.parse(localStorage.getItem('roomance_user') || 'null')

  const toggleTag = (t) => {
    setTags(prev => prev.includes(t) ? prev.filter(x=>x!==t) : [...prev, t])
  }

  const onPhotoChange = (i, file) => {
    if(!file) return
    const reader = new FileReader()
    reader.onload = () => {
      const arr = [...photos]
      arr[i] = reader.result
      setPhotos(arr)
    }
    reader.readAsDataURL(file)
  }

  const onFinish = async (e) => {
    e.preventDefault()
    if(!user) return nav('/')
    setLoading(true)
    try {
      const res = await fetch(`${baseUrl}/profile/details`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id,
          nickname,
          bio,
          age: age ? Number(age) : null,
          tags,
          photos: photos.filter(Boolean)
        })
      })
      if(!res.ok) throw new Error('Failed to save')
      await res.json()
      nav('/home')
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GradientBg>
      <div className="min-h-screen">
        <div className="px-6 pt-6"><Logo /></div>
        <div className="max-w-4xl mx-auto px-6 pb-16">
          <h1 className="text-3xl font-extrabold text-rose-500 mt-6">Complete your vibe</h1>
          <p className="text-rose-400">Make it personal and playful — this is what others will see!</p>
          <form onSubmit={onFinish} className="mt-6 grid md:grid-cols-2 gap-6">
            <div className="bg-white/80 border border-white/60 backdrop-blur rounded-3xl p-6 shadow">
              <h3 className="text-rose-500 font-bold">Upload Photos</h3>
              <div className="grid grid-cols-2 gap-4 mt-4">
                {[0,1].map(i=> (
                  <label key={i} className="aspect-square rounded-2xl border-2 border-dashed border-rose-200/80 bg-rose-50/50 flex items-center justify-center overflow-hidden cursor-pointer">
                    {photos[i] ? (
                      <img src={photos[i]} alt="preview" className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-rose-400">Add photo</span>
                    )}
                    <input type="file" accept="image/*" className="hidden" onChange={e=>onPhotoChange(i, e.target.files?.[0])} />
                  </label>
                ))}
              </div>
            </div>
            <div className="bg-white/80 border border-white/60 backdrop-blur rounded-3xl p-6 shadow">
              <div>
                <label className="text-sm text-rose-500">Nickname</label>
                <input value={nickname} onChange={e=>setNickname(e.target.value)} required className="mt-1 w-full rounded-xl border border-rose-200/70 bg-rose-50/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
              <div className="mt-4">
                <label className="text-sm text-rose-500">Age</label>
                <input type="number" value={age} onChange={e=>setAge(e.target.value)} className="mt-1 w-full rounded-xl border border-rose-200/70 bg-rose-50/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
              <div className="mt-4">
                <label className="text-sm text-rose-500">Bio / About Me</label>
                <textarea value={bio} onChange={e=>setBio(e.target.value)} rows={4} className="mt-1 w-full rounded-xl border border-rose-200/70 bg-rose-50/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
            </div>
            <div className="md:col-span-2 bg-white/80 border border-white/60 backdrop-blur rounded-3xl p-6 shadow">
              <h3 className="text-rose-500 font-bold">Select Personality Tags</h3>
              <div className="mt-3 flex flex-wrap gap-2">
                {TAGS.map(t => (
                  <button type="button" key={t} onClick={()=>toggleTag(t)} className={`px-3 py-1.5 rounded-full text-sm transition shadow-sm ${tags.includes(t) ? 'bg-rose-400 text-white' : 'bg-rose-50 text-rose-500 hover:bg-rose-100'}`}>
                    {t}
                  </button>
                ))}
              </div>
            </div>
            <div className="md:col-span-2">
              <button disabled={loading} className="w-full md:w-auto px-6 py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold shadow hover:from-rose-500 hover:to-pink-500 transition">
                {loading ? 'Saving...' : 'Finish & Enter ROOMANCE'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </GradientBg>
  )
}
