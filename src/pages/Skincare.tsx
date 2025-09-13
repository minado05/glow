import NavBar from "../components/NavBar";
import "../firebase";
import { getFirestore, collection, query, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import ProductCard from "../components/ProductCard";

const db = getFirestore();
const prodRef = collection(db, "products");

interface Product {
  name: string;
  price: number;
  rank: number;
  id: string;
}

function Skincare() {
  const [list, setList] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(prodRef, where("category", "==", "skincare"));
      const querySnapshot = await getDocs(q);

      const prodArray: Product[] = [];
      querySnapshot.forEach((doc) => {
        const prod = doc.data();
        prodArray.push({ name: prod.name, price: prod.price, rank: prod.rank, id: doc.id });
      });
      setList(prodArray);
    };

    fetchData();
  });

  return (
    <div>
      <NavBar />
      <h2>Skincare</h2>
      <div className="prod-grid">
        {list.map((item) => (
          <div key={item.id} className="rank-item">
            <ProductCard name={item.name} price={item.price} id={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skincare;
