import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Firebase config keys are client-side identifiers (NOT secrets).
// They're secured by Firestore security rules, not by hiding the config.
// See: https://firebase.google.com/docs/projects/api-keys
const firebaseConfig = {
  apiKey: "AIzaSyAqYaxp-v5GYWd6l3YtjleqT8dSWdMZRLo",
  authDomain: "al-fitness-hub.firebaseapp.com",
  projectId: "al-fitness-hub",
  storageBucket: "al-fitness-hub.firebasestorage.app",
  messagingSenderId: "711915218951",
  appId: "1:711915218951:web:36df1cfc96f662f98422a2",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
