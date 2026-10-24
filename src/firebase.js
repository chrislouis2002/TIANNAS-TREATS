// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth, inMemoryPersistence, setPersistence, signOut } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCptXTgfz3_MS6iSbiS15Kqbn4nzBkHsiM",
  authDomain: "tianna-s-treats-cafe.firebaseapp.com",
  projectId: "tianna-s-treats-cafe",
  storageBucket: "tianna-s-treats-cafe.firebasestorage.app",
  messagingSenderId: "218106404716",
  appId: "1:218106404716:web:594928ac953ecbcba09d49",
  measurementId: "G-FFYYG9H8RZ",
};

const app = !getApps().length
  ? initializeApp(firebaseConfig)
  : getApp();

const auth = getAuth(app);
const db = getFirestore(app);


// Do not retain an admin session across a full page reload.
const authReady = setPersistence(auth, inMemoryPersistence)
  .then(() => signOut(auth));


export { app, auth, authReady, db };
