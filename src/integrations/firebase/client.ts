// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAl9eRZZ5RWquHscAsVFeyBcX96nn8eqX8",
  authDomain: "kind-mind-7dec6.firebaseapp.com",
  projectId: "kind-mind-7dec6",
  storageBucket: "kind-mind-7dec6.firebasestorage.app",
  messagingSenderId: "527147972468",
  appId: "1:527147972468:web:1d1920c6e1ed468ca05e21",
  measurementId: "G-4VZEZJX3BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
