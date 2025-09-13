import { useState } from "react";
import ProductCard from "./ProductCard";
import { Link } from "react-router-dom";

interface Items {
  name: string;
  price: number;
  id: string;
}

interface Props {
  title: string;
  items: Items[]; //array of products
}

function Swiper({ title, items }: Props) {
  const [index, setIndex] = useState(0); //initialize on first slide

  function prevSlide() {
    setIndex(0);
  }
  function nextSlide() {
    setIndex(5);
  }

  return (
    <div>
      <h3>{title}</h3>
      <div className="swiper-section">
        <button className="prev" onClick={prevSlide} disabled={index === 0}>
          ❮
        </button>
        <div className="swiper-container">
          <div
            className="swiper-track"
            style={{
              transform: `translateX(-${index * 20}%)`,
            }}
          >
            {items.map((item) => (
              <div className="swiper-item" key={item.id}>
                <Link to={`/product/${item.id}`}>
                  <ProductCard name={item.name} price={item.price} id={item.id} />
                </Link>
              </div>
            ))}
          </div>
        </div>
        <button className="next" onClick={nextSlide} disabled={index >= 5}>
          ❯
        </button>
      </div>
    </div>
  );
}
export default Swiper;
