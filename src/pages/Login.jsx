import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import GradientBg from '../components/GradientBg'
import Logo from '../components/Logo'
import Spline from '@splinetool/react-spline'

export default function Login() {
  const nav = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'

  const onSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const res = await fetch(`${baseUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      })
      if (!res.ok) throw new Error('Invalid credentials')
      const data = await res.json()
      localStorage.setItem('roomance_user', JSON.stringify(data))
      nav('/home')
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <GradientBg>
      <div className="min-h-screen flex flex-col">
        <div className="px-6 pt-6">
          <Logo />
        </div>
        <div className="flex-1 grid lg:grid-cols-2 items-center max-w-6xl mx-auto w-full px-6 gap-8">
          <div className="relative hidden lg:block h-[520px] rounded-3xl overflow-hidden shadow">
            <Spline scene="https://prod.spline.design/ezRAY9QD27kiJcur/scene.splinecode" style={{ width: '100%', height: '100%' }} />
          </div>
          <form onSubmit={onSubmit} className="bg-white/80 backdrop-blur rounded-3xl p-8 shadow-xl border border-white/50">
            <h1 className="text-3xl font-extrabold text-rose-500">Welcome back</h1>
            <p className="text-rose-400 mt-1">Find your kind, vibe your tribe.</p>
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
                {loading ? 'Logging in...' : 'Log In'}
              </button>
              <p className="text-center text-sm text-rose-500">
                Don’t have an account? <Link to="/signup" className="underline">Sign up</Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </GradientBg>
  )
}
