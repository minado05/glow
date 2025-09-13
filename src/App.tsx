import "./App.css";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import Saved from "./pages/Saved";
import Account from "./pages/Account";
import Ranking from "./pages/Ranking";
import Skincare from "./pages/Skincare";
import Makeup from "./pages/Makeup";
import Product from "./components/Product";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";

import Profile from "./pages/Profile";
import "./firebase";

import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/saved" element={<Saved />} />
        <Route path="/account" element={<Account />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/skincare" element={<Skincare />} />
        <Route path="/makeup" element={<Makeup />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="product/:productId" element={<Product />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
