import { db } from "../config/firebaseConfig.js";
import { Timestamp } from "firebase-admin/firestore";

// Create a new booking only after payment
export const createBooking = async (req, res) => {
  try {
    const bookingData = req.body;

    if (!bookingData || !bookingData.email_address || !bookingData.service) {
      return res.status(400).json({ error: "Missing booking or user details." });
    }

    // Sanitize email to use as Firestore document ID
    const user_email = bookingData.email_address
      .replace(/[^\w\s@.]/gi, "")  // remove unsupported symbols
      .replace(/[.@]/g, "_")       // replace dots and @ with underscores
      .toLowerCase();

    // Reference to the user's subcollection for bookings
    const bookingRef = db
      .collection("bookings")
      .doc(user_email)
      .collection("user_bookings")
      .doc(); // auto-ID for each new booking

    await bookingRef.set({
      ...bookingData,
      payment_status: "confirmed",
      status:"Pending",
      createdAt: new Date(),
    });

    res.status(201).json({
      message: `Booking successfully created for ${bookingData.email_address}.`,
    });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Fetch the 20 most recent bookings across all users
export const getRecentBookings = async (req, res) => {
  try {
    const { lastCreatedAt } = req.query; // optional timestamp from frontend

    let query = db.collectionGroup("user_bookings")
      .orderBy("createdAt", "desc")
      .limit(20);

    if (lastCreatedAt) {
      // Convert safely to Firestore Timestamp
      const lastDate = new Date(lastCreatedAt);
      if (!isNaN(lastDate.getTime())) {
        const lastTimestamp = Timestamp.fromDate(lastDate);
        query = query.startAfter(lastTimestamp);
      } else {
        console.warn("⚠️ Invalid lastCreatedAt passed from frontend:", lastCreatedAt);
      }
    }

    const snapshot = await query.get();

    // Normalize Firestore timestamps to strings for frontend
    const bookings = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔍 Search bookings by client (firstname) or staff
export const searchBookings = async (req, res) => {
  try {
    const { client, staff, lastCreatedAt } = req.query; // client = firstname in DB

    if (!client && !staff) {
      return res.status(400).json({ error: "At least one search parameter required." });
    }

    let query = db.collectionGroup("user_bookings").orderBy("createdAt", "desc").limit(50);

    if (lastCreatedAt) {
      const lastDate = new Date(lastCreatedAt);
      if (!isNaN(lastDate.getTime())) {
        query = query.startAfter(Timestamp.fromDate(lastDate));
      }
    }

    const snapshot = await query.get();

    let bookings = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        id: doc.id,
        ...data,
        createdAt: data.createdAt?.toDate ? data.createdAt.toDate().toISOString() : null,
      };
    });

    // Filter by firstname (client) and staff
    if (client) {
      const search = client.toLowerCase();
      bookings = bookings.filter(b => b.firstname?.toLowerCase().includes(search));
    }

    if (staff) {
      const search = staff.toLowerCase();
      bookings = bookings.filter(b => b.staff?.toLowerCase().includes(search));
    }

    // Limit to 20 results
    bookings = bookings.slice(0, 20);

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error searching bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔹 Update booking status
export const updateBookingStatus = async (req, res) => {
  try {
    const { email_address, bookingId, status } = req.body;

    if (!email_address || !bookingId || !status) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    // Rebuild user_email key (same format used during creation)
    const user_email = email_address
      .replace(/[^\w\s@.]/gi, "")
      .replace(/[.@]/g, "_")
      .toLowerCase();

    const bookingRef = db
      .collection("bookings")
      .doc(user_email)
      .collection("user_bookings")
      .doc(bookingId);

    await bookingRef.update({ status });

    res.status(200).json({ message: `Booking ${bookingId} updated to ${status}` });
  } catch (error) {
    console.error("Error updating booking status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔹 Delete booking
export const deleteBooking = async (req, res) => {
  try {
    const { email_address, bookingId } = req.body;

    if (!email_address || !bookingId) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const user_email = email_address
      .replace(/[^\w\s@.]/gi, "")
      .replace(/[.@]/g, "_")
      .toLowerCase();

    const bookingRef = db
      .collection("bookings")
      .doc(user_email)
      .collection("user_bookings")
      .doc(bookingId);

    await bookingRef.delete();

    res.status(200).json({ message: `Booking ${bookingId} deleted successfully` });
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
