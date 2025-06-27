import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Collection from "./pages/Collection";
import CartPage from "./components/CartPage";
import '@fortawesome/fontawesome-free/css/all.min.css';

const App = () => {
  // ✅ Load cart from localStorage initially
  const [cartItems, setCartItems] = useState(() => {
    const saved = localStorage.getItem("cart");
    return saved ? JSON.parse(saved) : [];
  });

  // ✅ Save to localStorage whenever cartItems changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);

  // ✅ Example function to add to cart
  const addToCart = (product) => {
    setCartItems([...cartItems, product]);
  };

  return (
    <>
      <Navbar cartCount={cartItems.length} />
      <Routes>
        <Route path="/" element={<Home addToCart={addToCart} />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/collection" element={<Collection addToCart={addToCart} />} />
        <Route path="/cart" element={<CartPage cartItems={cartItems} />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
