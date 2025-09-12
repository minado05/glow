import { useParams } from "react-router-dom";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import "../firebase";
import { useEffect, useState } from "react";
import NavBar from "./NavBar";

const db = getFirestore();

interface ProductDetails {
  name: string;
  price: number;
}

function Product() {
  const { productId } = useParams<{ productId: string }>();
  const [product, setProduct] = useState<ProductDetails>({ name: "", price: 0 });

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
        </div>
      </div>
    </div>
  );
}

export default Product;
