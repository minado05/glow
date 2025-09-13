import { useParams } from "react-router-dom";
import { doc, getDoc, setDoc, getFirestore } from "firebase/firestore";
import { getAuth, onAuthStateChanged, type User } from "firebase/auth";
import "../firebase";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const db = getFirestore();

interface ProductDetails {
  name: string;
  price: number;
}

function Product() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe(); // cleanup listener
  }, []);
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails>({ name: "", price: 0 });
  const [inCart, setInCart] = useState(false);

  if (!productId) {
    // handle missing productId
    throw new Error("No product ID in URL");
  }
  useEffect(() => {
    const fetchData = async () => {
      const docRef = doc(db, "products", productId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const doc = docSnap.data();
        setProduct({ name: doc.name, price: doc.price });
      }
    };
    fetchData();
  });

  async function addToCart() {
    if (user == null) {
      alert("Please sign in!");
      return;
    }
    const id = productId ?? "";
    if (inCart) {
      alert("Product already in cart!");
      return;
    }
    await setDoc(doc(db, "users", user.uid, "cart", id), {
      name: product.name,
      price: product.price,
    });
    setInCart(true);
    alert("Product added to cart!");
  }
  return (
    <div>
      <NavBar />
      <div id="product-info-wrap">
        <img
          src={`/images/${productId}.png`}
          id="product-image"
          alt={`image for ${product.name}`}
        />
        <div id="product-description">
          <h1>{product.name}</h1>
          <h2>${product.price}</h2>
          <button className="add-cart" onClick={addToCart}>
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

export default Product;
