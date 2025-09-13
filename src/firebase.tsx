import { initializeApp } from "firebase/app";

//TODO: change security rules for firebase

const firebaseConfig = {
  apiKey: "AIzaSyBRYqpODOHWmLJwjLV2IJZNRjD2TdAj8BM",
  authDomain: "glow-cosme.firebaseapp.com",
  projectId: "glow-cosme",
  storageBucket: "glow-cosme.firebasestorage.app",
  messagingSenderId: "112195342593",
  appId: "1:112195342593:web:e94195df11f3a556e7cb00",
  measurementId: "G-PB61QP59CJ",
};

// init firebase app
initializeApp(firebaseConfig);
