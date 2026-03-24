// seedAdmin.js
import admin from "firebase-admin";
import fs from "fs";

// Load service account key
const serviceAccount = JSON.parse(
  fs.readFileSync("./serviceAccountKey.json", "utf8")
);

// Initialize Firebase Admin
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const seedAdmin = async () => {
  try {
    const userRecord = await admin.auth().createUser({
      email: "admin@foodiehub.com",
      password: "Admin123",
    });
    console.log("Admin created successfully:", userRecord.uid);
  } catch (err) {
    if (err.code === "auth/email-already-exists") {
      console.log("Admin already exists.");
    } else {
      console.error("Error creating admin:", err);
    }
  }
};

seedAdmin();