// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "web-novel-inventory.firebaseapp.com",
  projectId: "web-novel-inventory",
  storageBucket: "web-novel-inventory.appspot.com",
  messagingSenderId: "230777561640",
  appId: "1:230777561640:web:f2a79cc2d7bfb6917d0b1d"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);