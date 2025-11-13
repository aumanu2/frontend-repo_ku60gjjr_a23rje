import React, { useEffect, useState, useRef } from 'react'
import NavBar from '../components/NavBar'
import GradientBg from '../components/GradientBg'

export default function Chats(){
  const user = JSON.parse(localStorage.getItem('roomance_user') || 'null')
  const baseUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:8000'
  const [peers, setPeers] = useState([])
  const [active, setActive] = useState(null)
  const [msgs, setMsgs] = useState([])
  const [text, setText] = useState('')
  const bottomRef = useRef(null)

  const loadPeers = async () => {
    if(!user) return
    const res = await fetch(`${baseUrl}/chats/list?user_id=${user.user_id}`)
    const data = await res.json()
    setPeers(data)
    if(data[0]) setActive(data[0])
  }

  const loadMsgs = async (peer) => {
    if(!user || !peer) return
    const res = await fetch(`${baseUrl}/chats/messages?user_id=${user.user_id}&peer_id=${peer.user_id}`)
    const data = await res.json()
    setMsgs(data)
  }

  const send = async () => {
    if(!text.trim() || !active) return
    await fetch(`${baseUrl}/chats/send`, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ user_id: user.user_id, peer_id: active.user_id, text }) })
    setText('')
    loadMsgs(active)
  }

  useEffect(()=>{ loadPeers() }, [])
  useEffect(()=>{ loadMsgs(active) }, [active])
  useEffect(()=>{ bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

  return (
    <GradientBg>
      <NavBar />
      <div className="max-w-5xl mx-auto grid grid-cols-12 gap-4 px-4 py-6">
        <div className="col-span-12 md:col-span-4 bg-white/80 border border-white/50 rounded-3xl p-4">
          <h3 className="text-rose-500 font-bold mb-2">Matches</h3>
          <div className="space-y-2">
            {peers.map(p => (
              <button key={p.id} onClick={()=>setActive(p)} className={`w-full flex items-center gap-3 px-3 py-2 rounded-2xl text-left ${active?.id===p.id? 'bg-rose-50' : 'hover:bg-rose-50/60'}`}>
                <img src={p.photos?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop'} alt="pfp" className="w-10 h-10 rounded-2xl object-cover" />
                <div>
                  <div className="text-rose-600 font-semibold">{p.nickname}</div>
                  <div className="text-xs text-rose-400">{p.tags?.slice(0,2).join(' · ')}</div>
                </div>
              </button>
            ))}
            {peers.length===0 && <div className="text-rose-400 text-sm">No matches yet. Start liking profiles!</div>}
          </div>
        </div>
        <div className="col-span-12 md:col-span-8 bg-white/80 border border-white/50 rounded-3xl p-4 flex flex-col">
          {active ? (
            <>
              <div className="flex items-center gap-3 border-b border-rose-100 pb-3">
                <img src={active.photos?.[0] || 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=400&auto=format&fit=crop'} alt="pfp" className="w-10 h-10 rounded-2xl object-cover" />
                <div>
                  <div className="text-rose-600 font-semibold">{active.nickname}</div>
                  <div className="text-xs text-rose-400">Chatting now...</div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto py-4 space-y-2">
                {msgs.map(m => (
                  <div key={m.id} className={`max-w-[75%] rounded-2xl px-4 py-2 ${m.sender_id===user.user_id?'ml-auto bg-purple-100':'bg-rose-50'}`}>
                    <div className="text-sm text-rose-700">{m.text}</div>
                  </div>
                ))}
                <div ref={bottomRef} />
              </div>
              <div className="flex items-center gap-2 border-t border-rose-100 pt-3">
                <input value={text} onChange={e=>setText(e.target.value)} placeholder="Type a message..." className="flex-1 rounded-full bg-rose-50 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-rose-300" />
                <button onClick={send} className="px-4 py-2 rounded-full bg-gradient-to-r from-rose-400 to-pink-400 text-white">Send</button>
              </div>
            </>
          ) : (
            <div className="flex-1 grid place-items-center text-rose-400">Select a match to start chatting</div>
          )}
        </div>
      </div>
    </GradientBg>
  )
}
