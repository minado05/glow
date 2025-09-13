import NavBar from "../components/NavBar";
import "../firebase";

import { getFirestore, collection, getDocs } from "firebase/firestore";
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
  }, [user]);
  const [savedList, setSavedList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user == null) return;
      const savedRef = collection(db, "users", user.uid, "saved");
      const snapshot = await getDocs(savedRef);
      const savedArray: Product[] = [];
      snapshot.forEach((doc) => {
        const prod = doc.data();
        savedArray.push({ name: prod.name, price: prod.price, id: doc.id });
      });
      setSavedList(savedArray);
    };
    fetchData();
  });

  return (
    <div>
      <NavBar />
      <h2>Saved</h2>
      <div className="saved-grid">
        {savedList.map((item) => (
          <div className="saved-item">
            <ProductCard name={item.name} price={item.price} id={item.id} saved={true} />
          </div>
        ))}
      </div>
    </div>
  );
}
export default Saved;
