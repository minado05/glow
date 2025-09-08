import NavBar from "../components/NavBar";
//saved review/content posts
function Saved() {
  const savedList = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  return (
    <div>
      <NavBar />
      <h2>Saved</h2>
      <div className="saved-grid">
        {savedList.map((item) => (
          <div className="item">{item}</div>
        ))}
      </div>
    </div>
  );
}
export default Saved;
