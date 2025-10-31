import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import Booking from './components/Booking'

function App() {
  return (
    <div className=''>
    <Navbar/>
    {/* <Homepage/> */}
    <Booking/>
    <ContactUs/>
    <Footer/>
    </div>
  )
}

export default App
