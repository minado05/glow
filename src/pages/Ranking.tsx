import NavBar from "../components/NavBar";
import "../firebase";
import { getFirestore, collection, query, getDocs, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";
import { FaStar } from "react-icons/fa";
import ProductCard from "../components/ProductCard";

const db = getFirestore();
const prodRef = collection(db, "products");

interface Product {
  name: string;
  price: number;
  rank: number;
  id: string;
}

function Ranking() {
  const [rankList, setRankList] = useState<Product[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const q = query(prodRef, orderBy("rank"));
      const querySnapshot = await getDocs(q);

      const prodArray: Product[] = [];
      querySnapshot.forEach((doc) => {
        const prod = doc.data();
        prodArray.push({ name: prod.name, price: prod.price, rank: prod.rank, id: doc.id });
      });
      setRankList(prodArray);
    };

    fetchData();
  });

  return (
    <div>
      <NavBar />
      <h2>Ranking</h2>
      <div className="prod-grid">
        {rankList.map((item) => (
          <div key={item.id} className="rank-item">
            <div id="rank-number">
              <h4>{item.rank}</h4>
              <FaStar color="#ADD8E6" />
            </div>
            <ProductCard name={item.name} price={item.price} id={item.id} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
