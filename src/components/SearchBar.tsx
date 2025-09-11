import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";
import { Link } from "react-router-dom";

const db = getFirestore();
const prodRef = collection(db, "products");

interface Product {
  name: string;
  id: string;
}
function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  useEffect(() => {
    if (input.trim() === "") return;

    const fetchData = async () => {
      const q = query(prodRef, where("name", ">=", input), where("name", "<=", input + "~"));
      const querySnapshot = await getDocs(q);

      if (querySnapshot.empty) {
        console.log("No products found!");
        setResults([]);
        return;
      }

      const prodArray: Product[] = [];
      querySnapshot.forEach((doc) => {
        const prod = doc.data();
        prodArray.push({ name: prod.name, id: doc.id });
      });
      setResults(prodArray);
    };

    fetchData();
  }, [input, setResults]);

  return (
    <div id="search-bar">
      <input
        type="text"
        placeholder="search for product..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button id="search-button">
        <FontAwesomeIcon icon={faMagnifyingGlass} />
      </button>
      <ul id="results-list">
        {results.map((product) => (
          <li key={product.id}>
            <Link to={`/product/${product.id}`}>{product.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
