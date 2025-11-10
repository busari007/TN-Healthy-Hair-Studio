// Backend/config/firebaseConfig.js
import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);

// Initialize Firebase Admin SDK
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

const auth = admin.auth();
const db = admin.firestore();

// Connect Firestore emulator (Admin SDK supports this)
if (process.env.USE_FIREBASE_EMULATOR === "true") {
  db.settings({
    host: "localhost:8080",
    ssl: false,
  });
  console.log("✅ Connected to Firestore Emulator");
}

export { auth, db };