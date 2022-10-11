// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// Returns existing/default Firestore instance associated with firebase/app
import { getFirestore } from "firebase/firestore";

// https://firebase.google.com/docs/web/setup#available-libraries
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: "react-creative-threads.firebaseapp.com",
  projectId: "react-creative-threads",
  storageBucket: "react-creative-threads.appspot.com",
  messagingSenderId: "206933870953",
  appId: "1:206933870953:web:dc0b90cf7b9c0b9d3295f8",
  measurementId: "G-E1YSYYJGEW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
