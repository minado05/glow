import NavBar from "../components/NavBar";
import "../firebase";
import { getFirestore, collection, query, getDocs, where } from "firebase/firestore";
import { useEffect, useState } from "react";

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
      <h2>Makeup</h2>
      <div className="prod-grid">
        {list.map((item) => (
          <div key={item.id} className="rank-item">
            <img src={`/images/${item.id}.png`} alt={`image for ${item.name}`} />
            <h6>{item.name}</h6>
            <h5>${item.price}</h5>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Skincare;
