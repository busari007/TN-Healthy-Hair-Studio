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
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './components/PrivateRoute'
import PaymentSuccess from './components/PaymentSuccess'

function App() {
  return (
    <div>
      <AuthProvider>
      <ScrollToTop/>
      <Navbar />

      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/book_service" element={<Booking />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/bookings" element={<PaymentPage />} />
        <Route path="/payment-checkout" element={<Payment />} />
        <Route path="/payment-success" element={<PaymentSuccess/>} />
        <Route path="/admin/users" element={
          <PrivateRoute role="admin">
      <AdminDashboard />
           </PrivateRoute>} />
        <Route path="/admin" element={
          <PrivateRoute role="admin">
    <AdminBookingsDashboard />
          </PrivateRoute>}/>
      </Routes>
      <Footer />
      </AuthProvider>
    </div>
  )
}

export default App
