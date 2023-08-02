// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { initializeAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCkt2gTNgVzalKTkOvJB4msEvs2NWrS-Xw",
  authDomain: "denapp-16588.firebaseapp.com",
  projectId: "denapp-16588",
  storageBucket: "denapp-16588.appspot.com",
  messagingSenderId: "441048055233",
  appId: "1:441048055233:web:fd4e3b6dc85f6a8b9fc340",
  measurementId: "G-7YH8WPD2W1",
  storageBucket: "gs://denapp-16588.appspot.com",
};

// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = initializeAuth(FIREBASE_APP);
export const db = getFirestore(FIREBASE_APP);
