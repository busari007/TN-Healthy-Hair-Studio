import express from "express";
import { getAllUsers,deleteUser } from "../controllers/adminController.js";

const router = express.Router();

// Fetch all users (admin-only)
router.get("/users", getAllUsers);
router.delete("/users/:email", deleteUser);

// Admin bookings route (will implement later)
router.get("/", (req, res) => res.send("Admin Booking Dashboard route working"));

export default router;
