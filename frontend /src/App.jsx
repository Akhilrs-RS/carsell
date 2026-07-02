import React, { useState } from 'react'
import Nav from './components/nav'
import Home from './components/home'
import BuyCar from './components/buycar'
import SellCar from './components/sellcar'
import Finance from './components/finance'
import Blog from './components/blog'
import Contact from './components/contact'
import Admin from './components/admin'
import Dealers from './components/dealers'
import Footer from './components/footer'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.pathname === '/admin') {
      return 'admin'
    }
    return 'home'
  })

  return (
    <>
      {currentPage !== 'admin' && <Nav currentPage={currentPage} onNavigate={setCurrentPage} />}
      {currentPage === 'home' && <Home />}
      {currentPage === 'buy' && <BuyCar />}
      {currentPage === 'sell' && <SellCar onNavigate={setCurrentPage} />}
      {currentPage === 'finance' && <Finance />}
      {currentPage === 'blog' && <Blog />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'dealers' && <Dealers />}
      {currentPage === 'admin' && <Admin />}
      {currentPage !== 'admin' && <Footer onNavigate={setCurrentPage} />}
    </>
  )
}

export default App
