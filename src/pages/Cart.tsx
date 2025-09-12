import NavBar from "../components/NavBar";
import "../firebase";

import { getFirestore, collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { useEffect, useState } from "react";

const db = getFirestore();
const cartRef = collection(db, "users", "test", "cart");

interface Product {
  name: string;
  price: number;
  id: string;
}

function Cart() {
  const [cartList, setCartList] = useState<Product[]>([]);

  useEffect(() => {
    const fetchData = async () => {
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
    await deleteDoc(doc(db, "users", "test", "cart", id));
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
              <button onClick={() => deleteFromCart(item.id)}>Remove</button>
            </div>
          ))}
        </div>
        <div className="checkout">
          <h3>Total</h3>
          <h2>${total}</h2>
        </div>
      </div>
    </div>
  );
}
export default Cart;
