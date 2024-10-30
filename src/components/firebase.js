import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth"; // Import getAuth

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB8LzLqRpBsDUSTsWWuzGWsqwv051iJa4Y",
  authDomain: "lab6-818d6.firebaseapp.com",
  projectId: "lab6-818d6",
  storageBucket: "lab6-818d6.appspot.com",
  messagingSenderId: "26311661326",
  appId: "1:26311661326:web:480d0c8a9269c417bbe95f",
  measurementId: "G-G0EZ15JC8E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app); // Initialize Firebase Auth

export { auth }; // Export auth for use in your application
