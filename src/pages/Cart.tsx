import NavBar from "../components/NavBar";

function Cart() {
  return (
    <div>
      <NavBar />
      <h2>Cart</h2>
      <div className="cart-container">
        <div className="list-container">
          <div className="item">1</div>
          <div className="item">2</div>
          <div className="item">3</div>
          <div className="item">4</div>
          <div className="item">5</div>
        </div>
        <div className="checkout">Total</div>
      </div>
    </div>
  );
}
export default Cart;
