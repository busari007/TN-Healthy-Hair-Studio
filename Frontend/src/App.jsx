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
import { Routes, Route } from 'react-router-dom'

function App() {
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/booking" element={<Booking />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/payment-checkout" element={<Payment />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/bookings" element={<AdminBookingsDashboard />} />
      </Routes>

      <ContactUs/>
      <Footer />
    </div>
  )
}

export default App
