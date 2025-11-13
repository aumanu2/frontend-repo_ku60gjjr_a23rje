import React from 'react'

function Logo({ className = '' }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="w-8 h-8 rounded-2xl bg-gradient-to-br from-pink-300 via-rose-200 to-purple-200 shadow-inner flex items-center justify-center">
        <span className="text-pink-700">💞</span>
      </div>
      <div className="leading-tight">
        <div className="text-xl font-extrabold tracking-tight text-rose-500">ROOMANCE</div>
        <div className="text-[11px] text-rose-400 -mt-1">Find your kind, vibe your tribe.</div>
      </div>
    </div>
  )
}

export default Logo
