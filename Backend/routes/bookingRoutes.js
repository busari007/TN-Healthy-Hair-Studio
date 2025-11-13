import express from "express";
import {
  createBooking,
  getRecentBookings,
  searchBookings,
  updateBookingStatus,
  deleteBooking,
  getUserBookings,
  getBookedDates,
  checkStaffAvailability,
  getBookedTimes
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/recent", getRecentBookings);
router.get("/search", searchBookings);
router.patch("/update-status", updateBookingStatus); 
router.delete("/delete", deleteBooking);             
router.get("/user/:email", getUserBookings);
router.get("/booked-dates", getBookedDates);
router.get("/check-staff-availability", checkStaffAvailability);
router.get("/booked-times", getBookedTimes);

export default router;
