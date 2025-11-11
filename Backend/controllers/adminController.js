import { db } from "../config/firebaseConfig.js";

// GET all users
export const getAllUsers = async (req, res) => {
  try {
    const usersSnapshot = await db.collection("users").get();

    const users = usersSnapshot.docs.map((doc) => ({
      email_address: doc.id, // Firestore doc ID is the email
      ...doc.data(),
    }));

    // Optional: sort newest first
    users.sort((a, b) => b.createdAt?.toMillis() - a.createdAt?.toMillis());

    res.status(200).json({ users });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch users." });
  }
};

// DELETE user by email (used as doc ID)
export const deleteUser = async (req, res) => {
  try {
    const { email } = req.params; // from /users/:email
    const emailLower = email.toLowerCase();

    // Prevent deleting the main admin
    if (emailLower === "tnhealthyhairstudio@gmail.com") {
      return res.status(403).json({ message: "Cannot delete main admin account." });
    }

    const userRef = db.collection("users").doc(emailLower);
    const userDoc = await userRef.get();

    if (!userDoc.exists) {
      return res.status(404).json({ message: "User not found." });
    }

    await userRef.delete();
    res.status(200).json({ message: `User ${email} deleted successfully.` });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to delete user." });
  }
};
