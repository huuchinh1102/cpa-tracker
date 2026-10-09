import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCAd1WPDyb3XZ2gxTtfXJ_AZovYUEqeFwg",
  authDomain: "cpa-tracker-nhc11.firebaseapp.com",
  projectId: "cpa-tracker-nhc11",
  storageBucket: "cpa-tracker-nhc11.firebasestorage.app",
  messagingSenderId: "139134244598",
  appId: "1:139134244598:web:46002a8475486aca4c3ed7",
  measurementId: "G-J9GLZ1WBYZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);