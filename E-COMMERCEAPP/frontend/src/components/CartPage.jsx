// src/components/CartPage.jsx
import React from "react";
import Cart from "./Cart"; // aapka Cart component
import { useCart } from "./CartContext"; // make sure ye sahi path se ho

const CartPage = () => {
  const { items, removeItem } = useCart();

  return (
    <div className="cart-page-container">
      {/* <h2>Your Bag</h2> */}
      <Cart cartItems={items} onRemove={removeItem} />
    </div>
  );
};

export default CartPage;
