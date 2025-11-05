// App.jsx
import Navbar from './components/Navbar'
import Homepage from './components/Homepage'
import ContactUs from './components/ContactUs'
import Footer from './components/Footer'
import Booking from './components/Booking'
import SignUp from './components/SignUp'
import SignIn from './components/SignIn'
import PaymentPage from './components/PaymentPage'
import AdminDashboard from './components/Admin/AdminDashboard'
import AdminBookingsDashboard from './components/AdminPayment/AdminBookingsDashboard'
import Payment from './components/Payment'
import './App.css'
import { Routes, Route } from 'react-router-dom'
import ScrollToTop from './components/ScrollToTop'

function App() {
  return (
    <div>
      <ScrollToTop/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book_service" element={<Booking />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/bookings" element={<PaymentPage />} />
        <Route path="/payment-checkout" element={<Payment />} />
        <Route path="/admin/users" element={<AdminDashboard />} />
        <Route path="/admin" element={<AdminBookingsDashboard />} />
      </Routes>
      <Footer />
    </div>
  )
}

export default App
