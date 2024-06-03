import Cart from "./Cart";

export default function Modal() {
  console.log(open);
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <Cart />
      </div>
    </div>
  )
}
