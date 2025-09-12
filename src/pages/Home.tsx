import NavBar from "../components/NavBar";
import Swiper from "../components/Swiper";
import "../firebase";
import { getFirestore, collection, query, getDocs, limit, orderBy } from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore();
const prodRef = collection(db, "products");

interface Product {
  name: string;
  price: number;
  id: string;
}

function Home() {
  const [trendList, setTrendList] = useState<Product[]>([]);
  const [newList, setNewList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const qTrend = query(prodRef, limit(10));
      const qNew = query(prodRef, orderBy("date", "desc"), limit(10));
      const querySnapshotTrend = await getDocs(qTrend);
      const querySnapshotNew = await getDocs(qNew);

      const trendArray: Product[] = [];
      const newArray: Product[] = [];

      querySnapshotTrend.forEach((doc) => {
        const prod = doc.data();
        trendArray.push({ name: prod.name, price: prod.price, id: doc.id });
      });
      setTrendList(trendArray);
      querySnapshotNew.forEach((doc) => {
        const prod = doc.data();
        newArray.push({ name: prod.name, price: prod.price, id: doc.id });
      });
      setNewList(newArray);
    };

    fetchData();
  });

  return (
    <div>
      <NavBar />
      <div className="trend-container">
        <Swiper title="Trending" items={trendList} />
        <Swiper title="New" items={newList} />
      </div>
    </div>
  );
}

export default Home;
