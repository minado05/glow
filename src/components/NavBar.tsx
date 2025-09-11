import SearchBar from "./SearchBar";
import { FiUser, FiHeart, FiShoppingCart } from "react-icons/fi";

function NavBar() {
  return (
    <div id="nav-wrap">
      <nav className="topnav">
        <h1>
          <a href="/" style={{ fontFamily: "Nicolas Cochin Regular" }}>
            Glow
          </a>
        </h1>
        <SearchBar />
        <div id="icon-list">
          <a href="/account">
            <FiUser />
          </a>
          <a href="/saved">
            <FiHeart />
          </a>

          <a href="/cart">
            <FiShoppingCart />
          </a>
        </div>
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
