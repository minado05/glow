import NavBar from "../components/NavBar";
import "../firebase";

import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";

const db = getFirestore();

interface Product {
  name: string;
  price: number;
  id: string;
}

function Cart() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup listener
  }, [user]);
  const [cartList, setCartList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      if (user == null) {
        return;
      }
      const cartRef = collection(db, "users", user.uid, "cart");
      const snapshot = await getDocs(cartRef);
      const cartArray: Product[] = [];
      snapshot.forEach((doc) => {
        const prod = doc.data();
        cartArray.push({ name: prod.name, price: prod.price, id: doc.id });
      });
      setCartList(cartArray);
    };
    fetchData();
  });

  const total = cartList.reduce((tot, item) => tot + item.price, 0);

  async function deleteFromCart(id: string) {
    if (user == null) return;
    await deleteDoc(doc(db, "users", user.uid, "cart", id));
    alert("Product removed from cart successfully!");
  }

  return (
    <div>
      <NavBar />
      <h2>Cart</h2>
      <div className="cart-container">
        <div className="list-container">
          {cartList.map((item) => (
            <div className="item" key={item.id}>
              <img src={`/images/${item.id}.png`} />
              <h5>{item.name}</h5>
              <h5>${item.price}</h5>
              <button className="remove-button" onClick={() => deleteFromCart(item.id)}>
                Remove
              </button>
            </div>
          ))}
        </div>
        <div className="checkout">
          <h3>Checkout</h3>
          <div className="total-inline">
            <h5>Estimated Total</h5>
            <h5>${total}</h5>
          </div>
          <button
            className="add-cart"
            onClick={() => alert("These products are for fun only. Enjoy browsing :)")}
          >
            Continue
          </button>
        </div>
      </div>
    </div>
  );
}
export default Cart;
