import React, { createContext, useContext, useState } from "react";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export default function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  const addItem = (product) => {
    setItems((prev) => {
      const updated = [...prev, product];
      console.log("Cart items after add:", updated);
      return updated;
    });
  };

  const removeItem = (index) => {
    setItems((prev) => {
      const updated = prev.filter((_, i) => i !== index);
      console.log("Cart items after remove:", updated);
      return updated;
    });
  };

  return (
    <CartContext.Provider value={{ items, addItem, removeItem }}>
      {children}
    </CartContext.Provider>
  );
}
