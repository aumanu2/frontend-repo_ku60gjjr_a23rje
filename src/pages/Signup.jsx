import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import GradientBg from '../components/GradientBg'
import Logo from '../components/Logo'

export default function Signup() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onNext = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error('Signup failed')
      const data = await res.json()
      localStorage.setItem('roomance_user', JSON.stringify(data))
      nav('/details')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GradientBg>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 pt-6"><Logo /></div>
        <div className="flex-1 grid items-center max-w-md mx-auto w-full px-6">
          <form onSubmit={onNext} className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50">
            <h1 className="text-3xl font-extrabold text-rose-500">Create account</h1>
            <p className="text-rose-400 mt-1">Create your ROOMANCE profile in 2 quick steps.</p>
            <div className="mt-6 space-y-4">
              <div>
                <label className="text-sm text-rose-500">Email</label>
                <input value={email} onChange={e=>setEmail(e.target.value)} type="email" required className="mt-1 w-full rounded-xl border border-rose-200/70 bg-rose-50/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
              <div>
                <label className="text-sm text-rose-500">Password</label>
                <input value={password} onChange={e=>setPassword(e.target.value)} type="password" required className="mt-1 w-full rounded-xl border border-rose-200/70 bg-rose-50/50 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose-300" />
              </div>
              {error && <p className="text-rose-600 text-sm">{error}</p>}
              <button disabled={loading} className="w-full py-3 rounded-xl bg-gradient-to-r from-rose-400 to-pink-400 text-white font-semibold shadow hover:from-rose-500 hover:to-pink-500 transition">
                {loading ? 'Please wait...' : 'Next'}
              </button>
              <p className="text-center text-sm text-rose-500">
                Already have an account? <Link to="/" className="underline">Log in</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </GradientBg>
  )
}
