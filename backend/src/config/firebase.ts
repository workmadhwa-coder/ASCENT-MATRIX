import admin from "firebase-admin";
import dotenv from "dotenv";

dotenv.config();

const serviceAccountEnv = process.env.FIREBASE_SERVICE_ACCOUNT;

if (!serviceAccountEnv) {
  throw new Error("❌ FIREBASE_SERVICE_ACCOUNT is missing");
}

let serviceAccount;

try {
  serviceAccount = JSON.parse(serviceAccountEnv);
} catch (error) {
  throw new Error("❌ FIREBASE_SERVICE_ACCOUNT is not valid JSON");
}

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export const db = admin.firestore();
export { admin };
