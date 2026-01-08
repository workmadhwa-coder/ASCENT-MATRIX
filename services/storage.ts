
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, setDoc, getDoc } from 'firebase/firestore';
import { RegistrationData, SponsorshipInquiry } from '../types';

// New Firebase configuration for project ascentmatrix-1ba76
const firebaseConfig = {
  apiKey: "AIzaSyAiuLMWJxbrM_-Xj1p76yQI0wY12JgeA5A",
  authDomain: "ascentmatrix-1ba76.firebaseapp.com",
  projectId: "ascentmatrix-1ba76",
  storageBucket: "ascentmatrix-1ba76.firebasestorage.app",
  messagingSenderId: "929821956760",
  appId: "1:929821956760:web:b72eabfdfbf530c1364eed",
  measurementId: "G-9LZGC3VWGZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// COLLECTIONS
const COLLECTIONS = {
  REGISTRATIONS: 'registrations',
  SPONSORSHIPS: 'sponsorships'
};

/**
 * PUBLIC: Save a new registration
 * Allowed by security rules for public submission
 */
export const saveRegistration = async (data: RegistrationData) => {
  try {
    await setDoc(doc(db, COLLECTIONS.REGISTRATIONS, data.id), data, { merge: true });
  } catch (error) {
    console.error("Error saving registration:", error);
    throw error;
  }
};

// Fix: Added getRegistrationById to allow pages to retrieve registration data by its Firestore document ID
/**
 * PUBLIC: Fetch a registration by ID
 */
export const getRegistrationById = async (id: string): Promise<RegistrationData | null> => {
  try {
    const docRef = doc(db, COLLECTIONS.REGISTRATIONS, id);
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      return docSnap.data() as RegistrationData;
    }
    return null;
  } catch (error) {
    console.error("Error fetching registration:", error);
    throw error;
  }
};

/**
 * PUBLIC: Save a sponsorship inquiry
 * Allowed by security rules for public submission
 */
export const saveSponsorship = async (data: SponsorshipInquiry) => {
  try {
    await setDoc(doc(db, COLLECTIONS.SPONSORSHIPS, data.id), data);
  } catch (error) {
    console.error("Error saving sponsorship:", error);
    throw error;
  }
};
