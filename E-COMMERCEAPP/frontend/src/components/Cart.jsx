import React from "react";

const getTotal = (items) =>
  items.reduce((sum, item) => sum + Number(item.price || 0), 0);

const Cart = ({ cartItems, onRemove }) => {
  console.log("Cart received items:", cartItems);

  const subTotal = getTotal(cartItems);
  const shipping = subTotal === 0 ? 0 : 99;
  const grandTotal = subTotal + shipping;

  return (
    <section className="cart-wrapper">
      <h2 className="cart-title">Your Bag</h2>

      {cartItems.length === 0 ? (
        <p className="empty-text">Your cart is empty.</p>
      ) : (
        <>
          <ul className="cart-list">
            {cartItems.map((item, index) => (
              <li key={index} className="cart-card">
                <img src={item.image} alt={item.name} className="cart-thumb" />
                <div className="cart-info">
                  <h4>{item.name}</h4>
                  <p className="cart-price">₹{item.price}</p>
                  <p className="cart-size">Size: {item.selectedSize}</p>
                </div>
                <button
                  className="remove-btn"
                  onClick={() => onRemove(index)}
                  aria-label="Remove item"
                >
                  &times;
                </button>
              </li>
            ))}
          </ul>

          <div className="summary-box">
            <div className="summary-row">
              <span>Subtotal</span>
              <span>₹{subTotal}</span>
            </div>
            <div className="summary-row">
              <span>Shipping</span>
              <span>{shipping === 0 ? "—" : `₹${shipping}`}</span>
            </div>
            <hr />
            <div className="summary-row total">
              <span>Total</span>
              <span>₹{grandTotal}</span>
            </div>
            <button className="checkout-btn">Proceed to Checkout</button>
          </div>
        </>
      )}
    </section>
  );
};

export default Cart;
