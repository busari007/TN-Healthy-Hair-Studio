import { useState } from 'react'
import './App.css'
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import Booking from './components/Booking'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PaymentPage from './components/PaymentPage'

function App() {
  return (
    <div className=''>
    <Navbar/>
    {/* <SignUp/>
    <SignIn/>
    <PaymentPage/> */}
    <Homepage/>
    {/* <Booking/> */}
     <ContactUs/>
    <Footer/>
    </div>
  )
}

export default App
