// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBlJn8uu-WIEXGO3kCEXSZd9cc49Qv0Z-Q",
  authDomain: "auth-d8486.firebaseapp.com",
  projectId: "auth-d8486",
  storageBucket: "auth-d8486.firebasestorage.app",
  messagingSenderId: "387023181278",
  appId: "1:387023181278:web:cadcfe6432db8fe6ec794f",
  measurementId: "G-K4W1EDLGNN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);