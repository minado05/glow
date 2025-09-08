import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Saved from "./pages/Saved";
import Account from "./pages/Account";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
