import React from 'react'

function GradientBg({ children }) {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_20%,#fde2e4,transparent_60%),radial-gradient(circle_at_80%_30%,#e2f0f1,transparent_55%),radial-gradient(circle_at_40%_80%,#e9ddff,transparent_55%)]" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-pink-200/50 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-purple-200/50 blur-3xl" />
      <div className="relative z-10">{children}</div>
    </div>
  )
}

export default GradientBg
