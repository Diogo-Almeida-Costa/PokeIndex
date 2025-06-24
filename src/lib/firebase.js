import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
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

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

export default app;

