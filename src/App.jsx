import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'

function App() {
  return (
    <>
    <Navbar/>
    <Homepage/>
    <ContactUs/>
    <Footer/>
    </>
  )
}

export default App
