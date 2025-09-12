import { useState } from "react";

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
    if (index != 1) setIndex(0);
  }
  function nextSlide() {
    if (index != 5) setIndex(5);
  }

  return (
    <div>
      <h3>{title}</h3>
      <div className="swiper-section">
        <button className="prev" onClick={prevSlide}>
          ❮
        </button>
        <div className="swiper-container">
          {items.slice(index).map((item) => (
            <div className="swiper-item" key={item.id}>
              <img
                className="swiper-img"
                src={`/images/${item.id}.png`}
                alt={`image for ${item.name}`}
              />
              <h6>{item.name}</h6>
              <h5>{item.price}</h5>
            </div>
          ))}
        </div>
        <button className="next" onClick={nextSlide}>
          ❯
        </button>
      </div>
    </div>
  );
}
export default Swiper;
