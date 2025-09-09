import NavBar from "../components/NavBar";
const rankList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

function Makeup() {
  return (
    <div>
      <NavBar />
      <h2>Makeup</h2>
      <div className="prod-grid">
        {rankList.map((item) => (
          <div className="item">{item}</div>
        ))}
      </div>{" "}
    </div>
  );
}

export default Makeup;
