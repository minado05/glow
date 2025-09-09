import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";

function NavBar() {
  return (
    <div id="nav-wrap">
      <nav className="topnav">
        <h1>
          <a href="/" style={{ fontFamily: "Nicolas Cochin Regular" }}>
            Glow
          </a>
        </h1>
        <div id="search-bar">
          <input type="text" placeholder="search for product..." />
          <button id="search-button">
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <ul>
          <li>
            <a href="/account">Account</a>
          </li>
          <li>
            <a href="/saved">Saved</a>
          </li>
          <li>
            <a href="/cart">Cart</a>
          </li>
        </ul>
      </nav>
      <nav className="botnav">
        <a href="/ranking">Ranking</a>
        <a href="/skincare">Skincare</a>
        <a href="/makeup">Makeup</a>
      </nav>
      <hr />
    </div>
  );
}
export default NavBar;
