import React from 'react'

export default function Nav() {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/80 backdrop-blur-md border-b border-slate-800/80 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Left Side: Logo */}
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-white rounded flex items-center justify-center font-black text-slate-950">
            A
          </div>
          <div className="flex flex-col leading-none">
            <span className="text-white text-lg font-bold tracking-wider">AUTOFLOW</span>
            <span className="text-slate-400 text-[9px] uppercase tracking-widest mt-0.5">Integrated Ecosystem</span>
          </div>
        </div>

        {/* Center: Navigation Links */}
        <div className="hidden md:flex items-center space-x-8">
          <a href="#buy" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Buy Car
          </a>
          <a href="#sell" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Sell Car
          </a>
          <a href="#finance" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Finance
          </a>
          <a href="#blog" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Blog
          </a>
          <a href="#contact" className="text-slate-300 hover:text-white text-sm font-medium transition-colors">
            Contact
          </a>
        </div>

        {/* Right Side: Action Buttons */}
        <div className="flex items-center space-x-6">
          <a href="#dealers" className="text-slate-300 hover:text-white text-sm font-medium transition-colors hidden sm:block">
            For Dealers
          </a>
          <a 
            href="#browse" 
            className="bg-[#E05E1B] hover:bg-[#c95013] text-white px-5 py-2 rounded font-medium text-xs tracking-wide uppercase transition-all shadow-lg shadow-orange-950/30 hover:shadow-orange-950/50"
          >
            Browse Cars
          </a>
        </div>
      </div>
    </nav>
  )
}
