import NavBar from "../components/NavBar";

function Ranking() {
  const rankList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <NavBar />
      <h2>Ranking</h2>
      <div className="prod-grid">
        {rankList.map((item) => (
          <div className="item">{item}</div>
        ))}
      </div>
    </div>
  );
}

export default Ranking;
