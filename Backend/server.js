import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import adminRoutes from "./routes/adminRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import { db } from "./config/firebaseConfig.js";

dotenv.config();

const app = express();

/*
 * PAYSTACK WEBHOOK MUST BE RAW BODY
 * This MUST come BEFORE express.json()
 */
app.post(
  "/api/payments/webhook",
  express.raw({ type: "*/*" }),
  (req, res, next) => {
    // Save raw body for signature validation
    req.rawBody = req.body;
    next();
  }
);

app.use(cors());
app.use(express.json()); // All other routes can use JSON

// Normal routes
app.use("/api/auth", authRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/payments", paymentRoutes);

// Default port
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

/* ---- CREATE ADMIN IN FIRESTORE EMULATOR ---- */
async function createAdmin() {
  try {
    const docId = "tnhealthyhairstudio@gmail.com".toLowerCase();
    const adminDoc = await db.collection("users").doc(docId).get();

    if (adminDoc.exists) {
      console.log("Admin already exists in Firestore emulator");
      return;
    }

    await db.collection("users").doc(docId).set({
      firstname: "Ebun",
      lastname: "Humpati",
      email_address: "tnhealthyhairstudio@gmail.com",
      phone_number: "",
      password: "ebunhumpati123",
      role: "admin",
      createdAt: new Date(),
    });

    console.log("Admin created successfully in Firestore emulator");
  } catch (error) {
    console.error("Error creating admin:", error.message);
  }
}

createAdmin();
