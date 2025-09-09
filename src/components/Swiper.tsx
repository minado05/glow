import { useState } from "react";

interface Props {
  title: string;
  items: number[]; //for now an array of strings, TO-DO: update to objects
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
            <div className="swiper-item" key={item}>
              {item}
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
