import NavBar from "../components/NavBar";
import Swiper from "../components/Swiper";

function Home() {
  const myItems = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <NavBar />
      <div className="trend-container">
        <Swiper title="Trending" items={myItems} />
        <Swiper title="New" items={myItems} />
      </div>
    </div>
  );
}

export default Home;
