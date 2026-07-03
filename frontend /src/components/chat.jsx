import React, { useState, useEffect, useRef } from 'react'

export default function Chat() {
  const API_BASE = `http://${window.location.hostname}:5080/api`

  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    { id: 1, sender: 'agent', text: 'Hi! I am Sarah from AutoFlow customer support. How can I help you today?', time: 'Just now' }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [unread, setUnread] = useState(true)

  const messagesEndRef = useRef(null)

  // Scroll to bottom on new message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, isTyping])

  const handleToggle = () => {
    setIsOpen(!isOpen)
    if (unread) setUnread(false)
  }

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!inputText.trim()) return

    const userText = inputText.trim()
    setInputText('')

    // 1. Add User Message
    const userMsg = {
      id: Date.now(),
      sender: 'user',
      text: userText,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
    setMessages(prev => [...prev, userMsg])

    // 2. Log message to database inquiries table
    try {
      await fetch(`${API_BASE}/contact`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          fullName: 'Live Chat Guest',
          email: 'livechat@autoflow.in',
          phone: 'N/A',
          subject: 'Live Chat Inquiry',
          message: userText
        })
      })
    } catch (err) {
      console.error('Failed to log live chat session', err)
    }

    // 3. Trigger typing simulation and reply
    setIsTyping(true)
    setTimeout(() => {
      setIsTyping(false)
      let replyText = "Thanks for reaching out! A luxury vehicle consultant will analyze your request and follow up shortly."
      
      const textLower = userText.toLowerCase()
      if (textLower.includes('buy') || textLower.includes('porsche') || textLower.includes('audi') || textLower.includes('price')) {
        replyText = "We have premium stock (including Porsche, Audi, and BMW) verified and ready in our catalog. You can check pricing and schedule test drives on our Buy Car page!"
      } else if (textLower.includes('sell') || textLower.includes('inspection')) {
        replyText = "Ready to sell your luxury vehicle? You can book an inspection slot directly on our Sell Car page for immediate evaluation!"
      } else if (textLower.includes('finance') || textLower.includes('loan') || textLower.includes('emi')) {
        replyText = "AutoFlow offers premium finance partner rates starting at 7.5% p.a. You can calculate EMIs and check eligibility instantly on our Finance page!"
      }

      setMessages(prev => [...prev, {
        id: Date.now() + 1,
        sender: 'agent',
        text: replyText,
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }])
    }, 1500)
  }

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans text-left">
      
      {/* Floating Chat Bubble Button */}
      {!isOpen && (
        <button 
          onClick={handleToggle}
          className="relative w-14 h-14 bg-amber-600 hover:bg-amber-700 text-white rounded-full flex items-center justify-center shadow-xl transition-all hover:scale-105 cursor-pointer border border-amber-500/20"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {unread && (
            <span className="absolute top-0 right-0 block h-3 w-3 rounded-full bg-red-500 ring-2 ring-slate-950 animate-pulse" />
          )}
        </button>
      )}

      {/* Chat Window Panel */}
      {isOpen && (
        <div className="w-80 sm:w-96 h-[480px] bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl flex flex-col overflow-hidden">
          
          {/* Header */}
          <div className="bg-slate-950/80 border-b border-slate-800/80 px-5 py-4 flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <span className="w-8 h-8 rounded-full bg-amber-600 text-white font-bold flex items-center justify-center text-xs">S</span>
                <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-emerald-500 ring-2 ring-slate-950" />
              </div>
              <div>
                <h4 className="text-xs font-bold text-white">Sarah</h4>
                <p className="text-[9px] text-slate-500 font-medium">Customer Support Agent</p>
              </div>
            </div>
            
            <button 
              onClick={handleToggle}
              className="text-slate-500 hover:text-white transition-colors cursor-pointer text-sm p-1"
            >
              ✕
            </button>
          </div>

          {/* Messages Area */}
          <div className="flex-grow p-4 overflow-y-auto space-y-4 bg-slate-900/30">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[75%] rounded-2xl px-4 py-2.5 text-xs ${
                  msg.sender === 'user' 
                    ? 'bg-amber-600 text-white rounded-tr-none' 
                    : 'bg-slate-800 text-slate-100 rounded-tl-none'
                }`}>
                  <p className="font-normal leading-relaxed">{msg.text}</p>
                  <span className="block text-[8px] text-slate-500 mt-1.5 text-right">{msg.time}</span>
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-slate-800 text-slate-500 rounded-2xl rounded-tl-none px-4 py-2 text-[10px] italic">
                  Sarah is typing...
                </div>
              </div>
            )}
            
            <div ref={messagesEndRef} />
          </div>

          {/* Input form */}
          <form onSubmit={handleSendMessage} className="border-t border-slate-800 bg-slate-950/40 p-3 flex items-center space-x-2">
            <input 
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder="Ask about inventory, finance rates..."
              className="flex-grow bg-slate-950 border border-slate-850 rounded-full px-4 py-2 text-xs text-slate-100 placeholder-slate-700 focus:outline-none focus:border-slate-500"
            />
            <button 
              type="submit"
              className="w-8 h-8 rounded-full bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center flex-shrink-0 cursor-pointer shadow-md transition-colors"
            >
              <svg className="w-3.5 h-3.5 transform rotate-90" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </form>

        </div>
      )}

    </div>
  )
}
