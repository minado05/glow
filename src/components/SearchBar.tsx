import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function SearchBar() {
  const [input, setInput] = useState("");

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
    </div>
  );
}

export default SearchBar;
