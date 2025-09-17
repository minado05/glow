import NavBar from "../components/NavBar";
import "../firebase";

import { getFirestore, collection, onSnapshot } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

const db = getFirestore();

interface Product {
  name: string;
  price: number;
  id: string;
}

function Saved() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup listener
  });
  const [savedList, setSavedList] = useState<Product[]>([]);

  useEffect(() => {
    if (user == null) return;
    const savedRef = collection(db, "users", user.uid, "saved");
    //handle real-time changes to list
    const unsubscribe = onSnapshot(savedRef, (snapshot) => {
      const savedArray: Product[] = snapshot.docs.map((doc) => {
        const prod = doc.data();
        return { name: prod.name, price: prod.price, id: doc.id };
      });
      setSavedList(savedArray);
    });

    return () => unsubscribe();
  }, [user]);

  return (
    <div>
      <NavBar />
      <h2>Saved</h2>
      <div className="saved-grid">
        {savedList.map((item) => (
          <div className="saved-item" key={item.id}>
            <ProductCard name={item.name} price={item.price} id={item.id} saved={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Saved;
