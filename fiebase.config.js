// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
export const firebaseConfig = {
  apiKey: "AIzaSyBGf8c8PFilJR6yzICLyvqWZge2gplSqow",
  authDomain: "widi-my-app-f1dab.firebaseapp.com",
  projectId: "widi-my-app-f1dab",
  storageBucket: "widi-my-app-f1dab.firebasestorage.app",
  messagingSenderId: "920300071576",
  appId: "1:920300071576:web:666a4f528cf754cfd67eed",
  measurementId: "G-V8P0CYC6LL"
};

// Initialize Firebase
const analytics = getAnalytics(app);