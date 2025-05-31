// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBIhYs8oolNPBNZFfsi_gJAYSLk8Xb1bJs",
  authDomain: "fooddelivery-21d27.firebaseapp.com",
  projectId: "fooddelivery-21d27",
  storageBucket: "fooddelivery-21d27.firebasestorage.app",
  messagingSenderId: "775251833091",
  appId: "1:775251833091:web:1cadf50d5d180732a97936",
  measurementId: "G-8Z342QWSXG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { db };