import express from "express";
import { createBooking, getRecentBookings } from "../controllers/bookingController.js";
import { searchBookings } from "../controllers/bookingController.js";

const router = express.Router();

router.post("/create", createBooking);
router.get("/recent", getRecentBookings); // 👈 new route
router.get("/search", searchBookings); //search route

export default router;
