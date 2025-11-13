import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Details from './pages/Details'
import Home from './pages/Home'
import Chats from './pages/Chats'
import Profile from './pages/Profile'

function App(){
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/details" element={<Details />} />
      <Route path="/home" element={<Home />} />
      <Route path="/chats" element={<Chats />} />
      <Route path="/profile" element={<Profile />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  )
}

export default App
