// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';



const firebaseConfig = {
  apiKey: "AIzaSyCCG5FLGzOuMArsH1VhVZ--PIzP2613KT0",
  authDomain: "hostelmgmt-d2984.firebaseapp.com",
  projectId: "hostelmgmt-d2984",
  storageBucket: "hostelmgmt-d2984.appspot.com",
  messagingSenderId: "306037558198",
  appId: "1:306037558198:web:1128c9ffa15e449b33cf17",
  measurementId: "G-PFB0NZ34BS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;

