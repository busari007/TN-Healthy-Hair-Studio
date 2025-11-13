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

export const getUserBookings = async (req, res) => {
  try {
    const { email } = req.params;

    if (!email) return res.status(400).json({ error: "Email is required" });

    const user_email = email
      .replace(/[^\w\s@.]/gi, "")
      .replace(/[.@]/g, "_")
      .toLowerCase();

    const snapshot = await db
      .collection("bookings")
      .doc(user_email)
      .collection("user_bookings")
      .orderBy("createdAt", "desc")
      .get();

    const bookings = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
      createdAt: doc.data().createdAt?.toDate
        ? doc.data().createdAt.toDate().toISOString()
        : null,
    }));

    res.status(200).json({ bookings });
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// 🔹 Get all booked dates (day, month, year)
export const getBookedDates = async (req, res) => {
  try {
    const snapshot = await db.collectionGroup("user_bookings").get();

    // Helper to normalize time formatting (e.g. "9:00 AM" → "9:00AM")
    const normalize = (t) => (t ? t.replace(/\s/g, "").toUpperCase() : "");

    // Track bookings by date and staff
    const bookingsByDate = {};

    snapshot.forEach((doc) => {
      const data = doc.data();
      const { day, month, year, staff, time } = data;
      if (!day || !month || !year || !staff || !time) return;

      const key = `${day}-${month}-${year}`;
      if (!bookingsByDate[key]) bookingsByDate[key] = {};
      if (!bookingsByDate[key][staff]) bookingsByDate[key][staff] = [];

      bookingsByDate[key][staff].push(normalize(time));
    });

    const allStaff = ["Mrs. Ebun", "Stephanie", "Ayomide"];
    const requiredTimes = ["9:00AM", "12:00PM"].map(normalize);

    // ✅ A date is fully booked if *all staff* have *both required times* booked
    const fullyBookedDates = Object.entries(bookingsByDate)
      .filter(([_, staffBookings]) =>
        allStaff.every(
          (staff) =>
            staffBookings[staff] &&
            requiredTimes.every((t) => staffBookings[staff].includes(t))
        )
      )
      .map(([key]) => {
        const [day, month, year] = key.split("-").map(Number);
        return { day, month, year };
      });

    res.status(200).json({ bookedDates: fullyBookedDates });
  } catch (error) {
    console.error("Error fetching booked dates:", error);
    res.status(500).json({ error: "Failed to fetch booked dates" });
  }
};

// 🔹 Check staff availability for a given date
export const checkStaffAvailability = async (req, res) => {
  try {
    const { staff, day, month, year } = req.query;

    if (!staff || !day || !month || !year) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    const snapshot = await db.collectionGroup("user_bookings")
      .where("staff", "==", staff)
      .where("day", "==", Number(day))
      .where("month", "==", Number(month))
      .where("year", "==", Number(year))
      .get();

    // Normalize time strings to remove spaces for consistent comparison
    const bookedTimes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.time) {
        // Remove extra spaces and make AM/PM uppercase
        bookedTimes.push(data.time.replace(/\s+/g, "").toUpperCase()); // "9:00AM", "12:00PM"
      }
    });

    res.status(200).json({ bookedTimes }); // e.g. ["9:00AM", "12:00PM"]
  } catch (error) {
    console.error("Error checking staff availability:", error);
    res.status(500).json({ error: "Failed to check staff availability" });
  }
};

// Get booked times for a specific staff and date
// Regular fetch route (for initial load)
export const getBookedTimes = async (req, res) => {
  try {
    const { staff, day, month, year } = req.query;

    if (!staff || !day || !month || !year) {
      return res.status(400).json({ error: "Missing required query parameters" });
    }

    const snapshot = await db.collectionGroup("user_bookings")
      .where("staff", "==", staff)
      .where("day", "==", Number(day))
      .where("month", "==", Number(month))
      .where("year", "==", Number(year))
      .get();

    const bookedTimes = [];
    snapshot.forEach((doc) => {
      const data = doc.data();
      if (data.time) bookedTimes.push(data.time);
    });

    res.status(200).json({ bookedTimes });
  } catch (error) {
    console.error("Error fetching booked times:", error);
    res.status(500).json({ error: "Failed to fetch booked times" });
  }
};

// Realtime route using Server-Sent Events
export const streamBookedTimes = (req, res) => {
  const { staff, day, month, year } = req.query;

  if (!staff || !day || !month || !year) {
    res.status(400).json({ error: "Missing required query parameters" });
    return;
  }

  res.setHeader("Content-Type", "text/event-stream");
  res.setHeader("Cache-Control", "no-cache");
  res.setHeader("Connection", "keep-alive");

  const query = db.collectionGroup("user_bookings")
    .where("staff", "==", staff)
    .where("day", "==", Number(day))
    .where("month", "==", Number(month))
    .where("year", "==", Number(year));

  const unsubscribe = query.onSnapshot(
    (snapshot) => {
      const bookedTimes = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        if (data.time) bookedTimes.push(data.time);
      });

      res.write(`data: ${JSON.stringify({ bookedTimes })}\n\n`);
    },
    (error) => {
      console.error("Error in realtime booking stream:", error);
      res.write(`event: error\ndata: ${JSON.stringify({ error: error.message })}\n\n`);
    }
  );

  // Close listener on client disconnect
  req.on("close", () => {
    unsubscribe();
    res.end();
  });
};

