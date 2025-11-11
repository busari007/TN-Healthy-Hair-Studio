import { db } from "../config/firebaseConfig.js";

// Create a new booking only after payment
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    if (!bookingData || !bookingData.email_address || !bookingData.service) {
      return res.status(400).json({ error: "Missing booking or user details." });
    }

    // Sanitize service name (remove slashes, colons, etc.)
    const bookingId = bookingData.firstname
      .replace(/[^\w\s]/gi, "") // remove special characters
      .replace(/\s+/g, "_")     // replace spaces with underscores
      .toLowerCase();

    // Create a booking inside a subcollection under the service
    const bookingRef = db
      .collection("bookings")
      .doc(bookingId)           // service document

    await bookingRef.set({
      ...bookingData,
      payment_status: "confirmed",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: `Booking successfully created under service '${bookingData.service}'.`,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
