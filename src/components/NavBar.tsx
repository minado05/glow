function NavBar() {
  return (
    <div>
      <nav className="topnav">
        <h1>
          <a href="/">Glow</a>
        </h1>
        <input type="text" placeholder="search..." />
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
        <div>Categories</div>
        <div>New</div>
        <div>Skincare</div>
        <div>Makeup</div>
      </nav>
    </div>
  );
}
export default NavBar;
