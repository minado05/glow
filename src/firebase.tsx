import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

//init services
const db = getFirestore();

//get collection data
const querySnapshot = await getDocs(collection(db, "products"));
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  console.log(doc.id, " => ", doc.data());
});

const savedRef = collection(db, "users", "test", "saved");
