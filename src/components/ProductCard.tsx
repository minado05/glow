import { FaHeart } from "react-icons/fa";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { useState, useEffect } from "react";
import { getFirestore } from "firebase/firestore";
import { getDoc, doc, setDoc, deleteDoc } from "firebase/firestore";
import { Link } from "react-router-dom";

const db = getFirestore();
interface Props {
  name: string;
  price: number;
  id: string;
  saved?: boolean;
  cart?: boolean;
}
function ProductCard({ name, price, id, saved = false, cart = false }: Props) {
  //check if product is in saved collection if not already passed as true
  useEffect(() => {
    if (!saved) {
      async function checkSaved() {
        const docSnap = await getDoc(doc(db, "users", "test", "saved", id));
        setIsSaved(docSnap.exists());
      }
      checkSaved();
    }
    if (!cart) {
      async function checkInCart() {
        const docSnapCart = await getDoc(doc(db, "users", "test", "cart", id));
        setInCart(docSnapCart.exists());
      }
      checkInCart();
    }
  });
  const [isSaved, setIsSaved] = useState(saved);
  const [inCart, setInCart] = useState(cart);

  async function toggleSave() {
    if (isSaved) {
      //unsave item, remove from db
      await deleteDoc(doc(db, "users", "test", "saved", id));
    } else {
      //save item, add to db
      await setDoc(doc(db, "users", "test", "saved", id), { name: name, price: price });
    }
    setIsSaved((prev) => !prev);
  }

  async function addToCart() {
    if (inCart) {
      alert("Product already in cart!");
      return;
    }
    await setDoc(doc(db, "users", "test", "cart", id), { name: name, price: price });
    alert("Product added to cart!");
  }

  return (
    <div className="product-card">
      <Link to={`/product/${id}`} style={{ padding: "0", margin: "0" }}>
        <img className="swiper-img" src={`/images/${id}.png`} alt={`image for ${name}`} />
      </Link>
      <h6>{name}</h6>
      <div className="swiper-inline">
        <h5>${price}</h5>
        <div className="swiper-buttons">
          <button className="save" onClick={toggleSave}>
            {isSaved ? <FaHeart color="red" /> : <FiHeart />}
          </button>
          <button className="cart" onClick={addToCart}>
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;
