import express from "express";
const router = express.Router();

router.post("/admin/users", (req, res) => res.send("Admin User's Dashboard route working"));
router.post("/admin", (req, res) => res.send("Admin Booking Dashboard route working"));

export default router;
