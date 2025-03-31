import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDmXH3NP...",
  authDomain: "simulador-dados-bd.firebaseapp.com",
  projectId: "simulador-dados-bd",
  storageBucket: "simulador-dados-bd.appspot.com",
  messagingSenderId: "322555252275",
  appId: "1:322555252275:web:e0d01f2d0737d33e979d46",
  measurementId: "G-LL77JTKNG3"
};

// Inicializa Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export default db;
