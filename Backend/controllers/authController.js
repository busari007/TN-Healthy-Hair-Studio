import { db } from "../config/firebaseConfig.js";

// === USER SIGN-UP ===
export const signUpUser = async (req, res) => {
  try {
    const { firstname, lastname, email_address, password, phone_number } = req.body;

    if (!email_address || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const docId = email_address.toLowerCase();

    const existingUser = await db.collection("users").doc(docId).get();
    if (existingUser.exists) {
      return res.status(409).json({ message: "An account with this email already exists." });
    }

    // Save new user
    await db.collection("users").doc(docId).set({
      firstname,
      lastname,
      email_address,
      phone_number,
      role: "user",
      password, // local testing only
      createdAt: new Date(),
    });

    // ✅ Return user object along with message
    res.status(201).json({
      message: `User ${firstname} ${lastname} registered successfully`,
      user: { firstname, lastname, email_address, phone_number, role: "user" },
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: error.message });
  }
};

// === USER LOGIN (local testing) ===
export const loginUser = async (req, res) => {
  try {
    const { email_address, password } = req.body;

    if (!email_address || !password) {
      return res.status(400).json({ message: "Email and password are required." });
    }

    const docId = email_address.toLowerCase();
    const userDoc = await db.collection("users").doc(docId).get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    const userData = userDoc.data();

    if (userData.password !== password) {
      return res.status(401).json({ message: "Incorrect password." });
    }

    // ✅ Login successful
    res.status(200).json({
      message: `Login successful for ${userData.firstname} ${userData.lastname}`,
      user: {
        firstname: userData.firstname,
        lastname: userData.lastname,
        email_address: userData.email_address,
        phone_number: userData.phone_number,
        role: userData.role,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
};
