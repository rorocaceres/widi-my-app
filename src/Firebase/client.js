// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBGf8c8PFilJR6yzICLyvqWZge2gplSqow",
  authDomain: "widi-my-app-f1dab.firebaseapp.com",
  projectId: "widi-my-app-f1dab",
  storageBucket: "widi-my-app-f1dab.firebasestorage.app",
  messagingSenderId: "920300071576",
  appId: "1:920300071576:web:666a4f528cf754cfd67eed",
  measurementId: "G-V8P0CYC6LL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
 //https://www.youtube.com/watch?v=scXYrAHSKJo