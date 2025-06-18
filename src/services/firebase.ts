// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC4Y5PYCBpT5GELiGqJ7LkF-mPjn8G5pIM",
  authDomain: "pokeindex-1e013.firebaseapp.com",
  projectId: "pokeindex-1e013",
  storageBucket: "pokeindex-1e013.firebasestorage.app",
  messagingSenderId: "454797657629",
  appId: "1:454797657629:web:128839ec5668f41bf968f4",
  measurementId: "G-8J6NKPB3P4"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);