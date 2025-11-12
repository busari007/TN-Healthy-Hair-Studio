import express from "express";
import {
  createBooking,
  getRecentBookings,
  searchBookings,
  updateBookingStatus,
  deleteBooking
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/recent", getRecentBookings);
router.get("/search", searchBookings);
router.patch("/update-status", updateBookingStatus); // ✅ New
router.delete("/delete", deleteBooking);             // ✅ New

export default router;
