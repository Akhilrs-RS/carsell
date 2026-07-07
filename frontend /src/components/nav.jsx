import React, { useState, useEffect } from 'react'

export default function Nav({ currentPage, onNavigate }) {
  const [isOpen, setIsOpen] = useState(false)
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('carsell_user')
    return saved ? JSON.parse(saved) : null
  })

  useEffect(() => {
    const checkUser = () => {
      const saved = localStorage.getItem('carsell_user')
      setUser(saved ? JSON.parse(saved) : null)
    }
    window.addEventListener('storage', checkUser)
    return () => window.removeEventListener('storage', checkUser)
  }, [])

  const handleNavigate = (page, e) => {
    e.preventDefault()
    onNavigate(page)
    setIsOpen(false)
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-black backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <div 
          onClick={() => onNavigate('home')} 
          className="flex items-center space-x-3 cursor-pointer"
        >
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-black text-slate-950">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white text-lg font-bold tracking-wider">AUTOFLOW</span>
            <span className="text-slate-400 text-[9px] uppercase tracking-widest mt-0.5">Integrated Ecosystem</span>
          </div>
        </div>

        {/* Center: Desktop Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a 
            href="#buy" 
            onClick={(e) => handleNavigate('buy', e)}
            className={`${currentPage === 'buy' ? 'text-white font-bold' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors`}
          >
            Buy Car
          </a>
          <a 
            href="#sell" 
            onClick={(e) => handleNavigate('sell', e)}
            className={`${currentPage === 'sell' ? 'text-white font-bold' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors`}
          >
            Sell Car
          </a>
          <a 
            href="#finance" 
            onClick={(e) => handleNavigate('finance', e)}
            className={`${currentPage === 'finance' ? 'text-white font-bold' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors`}
          >
            Finance
          </a>
          <a 
            href="#blog" 
            onClick={(e) => handleNavigate('blog', e)}
            className={`${currentPage === 'blog' ? 'text-white font-bold' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors`}
          >
            Blog
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavigate('contact', e)}
            className={`${currentPage === 'contact' ? 'text-white font-bold' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors`}
          >
            Contact
          </a>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center space-x-6">
          <a 
            href="#dealers" 
            onClick={(e) => handleNavigate('dealers', e)}
            className={`${currentPage === 'dealers' ? 'text-white font-bold animate-pulse' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors hidden sm:block`}
          >
            For Dealers
          </a>
          {user ? (
            <button 
              onClick={(e) => handleNavigate('portal', e)}
              className="w-8 h-8 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-xs tracking-wider cursor-pointer border border-amber-600/30 hover:bg-amber-400 transition-colors"
              title="My Account Portal"
            >
              {user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}
            </button>
          ) : (
            <a 
              href="#portal" 
              onClick={(e) => handleNavigate('portal', e)}
              className={`${currentPage === 'portal' ? 'text-white font-bold' : 'text-slate-300'} hover:text-white text-sm font-medium transition-colors`}
            >
              Sign In
            </a>
          )}
          <a 
            href="#buy" 
            onClick={(e) => handleNavigate('buy', e)}
            className="bg-[#E05E1B] hover:bg-[#c95013] text-white px-5 py-2 rounded font-medium text-xs tracking-wide uppercase transition-all shadow-lg shadow-orange-950/30 hover:shadow-orange-950/50 hidden xs:block"
          >
            Browse Cars
          </a>

          {/* Mobile Menu Hamburger Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden text-slate-300 hover:text-white focus:outline-none p-1 transition-colors"
            aria-label="Toggle Menu"
          >
            {isOpen ? (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile Collapsible Dropdown */}
      {isOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-slate-800 flex flex-col space-y-4 pb-2">
          <a 
            href="#buy" 
            onClick={(e) => handleNavigate('buy', e)}
            className={`${currentPage === 'buy' ? 'text-white font-bold' : 'text-slate-400'} hover:text-white text-sm font-medium transition-colors`}
          >
            Buy Car
          </a>
          <a 
            href="#sell" 
            onClick={(e) => handleNavigate('sell', e)}
            className={`${currentPage === 'sell' ? 'text-white font-bold' : 'text-slate-400'} hover:text-white text-sm font-medium transition-colors`}
          >
            Sell Car
          </a>
          <a 
            href="#finance" 
            onClick={(e) => handleNavigate('finance', e)}
            className={`${currentPage === 'finance' ? 'text-white font-bold' : 'text-slate-400'} hover:text-white text-sm font-medium transition-colors`}
          >
            Finance
          </a>
          <a 
            href="#blog" 
            onClick={(e) => handleNavigate('blog', e)}
            className={`${currentPage === 'blog' ? 'text-white font-bold' : 'text-slate-400'} hover:text-white text-sm font-medium transition-colors`}
          >
            Blog
          </a>
          <a 
            href="#contact" 
            onClick={(e) => handleNavigate('contact', e)}
            className={`${currentPage === 'contact' ? 'text-white font-bold' : 'text-slate-400'} hover:text-white text-sm font-medium transition-colors`}
          >
            Contact
          </a>
          <a 
            href="#dealers" 
            onClick={(e) => handleNavigate('dealers', e)}
            className={`${currentPage === 'dealers' ? 'text-white font-bold' : 'text-slate-400'} hover:text-white text-sm font-medium transition-colors sm:hidden`}
          >
            For Dealers
          </a>
          {user ? (
            <a 
              href="#portal" 
              onClick={(e) => handleNavigate('portal', e)}
              className="text-slate-450 hover:text-white text-sm font-semibold flex items-center space-x-2.5 transition-colors"
            >
              <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-[10px]">{user.fullName.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)}</span>
              <span>My Account Portal</span>
            </a>
          ) : (
            <a 
              href="#portal" 
              onClick={(e) => handleNavigate('portal', e)}
              className={`${currentPage === 'portal' ? 'text-white font-bold' : 'text-slate-450'} hover:text-white text-sm font-medium transition-colors`}
            >
              Sign In
            </a>
          )}
          <a 
            href="#buy" 
            onClick={(e) => handleNavigate('buy', e)}
            className="bg-[#E05E1B] text-white px-5 py-2.5 rounded text-center font-bold text-xs uppercase tracking-wide transition-all xs:hidden"
          >
            Browse Cars
          </a>
        </div>
      )}
    </nav>
  )
}

