import { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import "../firebase";
import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();
const prodRef = collection(db, "products");

function SearchBar() {
  const [input, setInput] = useState("");
  const [results, setResults] = useState<string[]>([]);

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

      const nameArray: string[] = [];
      querySnapshot.forEach((doc) => {
        const prod = doc.data();
        nameArray.push(prod.name);
        console.log(prod.name);
      });
      setResults(nameArray);
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
        {results.map((result: string, id: number) => (
          <li key={id}>{result}</li>
        ))}
      </ul>
    </div>
  );
}

export default SearchBar;
