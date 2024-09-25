// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getDatabase } from 'firebase/database';
import { getAuth,GoogleAuthProvider } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBC0ipK50UBHPef9Km1S3uMb5cK9g6UZMc",
  authDomain: "isa-domain-sel.firebaseapp.com",
  databaseURL: "https://isa-domain-sel-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "isa-domain-sel",
  storageBucket: "isa-domain-sel.appspot.com",
  messagingSenderId: "141928903550",
  appId: "1:141928903550:web:e5c8348e71b00aa3ccf92f",
  measurementId: "G-N6DM8XP0JH"
};

// Initialize Firebase

const app = initializeApp(firebaseConfig);
export const db=getDatabase(app);
export const auth = getAuth(app);

export const provider= new GoogleAuthProvider();