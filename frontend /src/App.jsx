import React, { useState } from 'react'
import Nav from './components/nav'
import Home from './components/home'
import BuyCar from './components/buycar'
import SellCar from './components/sellcar'
import Finance from './components/finance'
import Blog from './components/blog'
import Contact from './components/contact'
import Admin from './components/admin'
import ERP from './components/erp'
import Portal from './components/portal'
import Chat from './components/chat'
import Dealers from './components/dealers'
import Footer from './components/footer'

function App() {
  const [currentPage, setCurrentPage] = useState(() => {
    if (window.location.pathname === '/admin') {
      return 'admin'
    }
    if (window.location.pathname === '/erp') {
      return 'erp'
    }
    if (window.location.pathname === '/portal') {
      return 'portal'
    }
    return 'home'
  })

  return (
    <>
      {currentPage !== 'admin' && currentPage !== 'erp' && <Nav currentPage={currentPage} onNavigate={setCurrentPage} />}
      {currentPage === 'home' && <Home />}
      {currentPage === 'buy' && <BuyCar onNavigate={setCurrentPage} />}
      {currentPage === 'sell' && <SellCar onNavigate={setCurrentPage} />}
      {currentPage === 'finance' && <Finance />}
      {currentPage === 'blog' && <Blog />}
      {currentPage === 'contact' && <Contact />}
      {currentPage === 'dealers' && <Dealers />}
      {currentPage === 'admin' && <Admin />}
      {currentPage === 'erp' && <ERP />}
      {currentPage === 'portal' && <Portal onNavigate={setCurrentPage} />}
      {currentPage !== 'admin' && currentPage !== 'erp' && <Footer onNavigate={setCurrentPage} />}
      {currentPage !== 'admin' && currentPage !== 'erp' && <Chat />}
    </>
  )
}

export default App
