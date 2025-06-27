import React, { useRef, useEffect, useState } from "react";
import productData from "../data/productData"; // Ye aapka product data
import ProductModal from "../components/ProductModal";
import { useNavigate } from "react-router-dom";
import { useCart } from "../components/CartContext";
import "../App.css";

const NewCollection = () => {
  const scrollRef = useRef();
  const [isPaused, setIsPaused] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { addItem } = useCart();
  const navigate = useNavigate();

  const scrollLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft -= 320;
    }
  };

  const scrollRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollLeft += 320;
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused && scrollRef.current) {
        const container = scrollRef.current;
        const maxScroll = container.scrollWidth - container.clientWidth;
        const offset = 20;

        if (container.scrollLeft >= maxScroll - offset) {
          container.scrollLeft = 0;
        } else {
          container.scrollLeft += 320;
        }
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [isPaused]);

  // Add to cart handler from modal
  const handleAddToCart = (product, size) => {
    addItem(product, size);
    setSelectedProduct(null); // modal close karo
    navigate("/cart"); // cart page par redirect
  };

  return (
    <div className="collection-section">
      <h2>New Collection</h2>
      <p>
        "Explore our latest styles, discover timeless trends, and redefine elegance
        with every outfit."
      </p>

      <div className="slider-container">
        <button className="slider-arrow left" onClick={scrollLeft}>
          &#8592;
        </button>

        <div
          className="image-slider"
          ref={scrollRef}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {productData.map((product) => (
            <img
              key={product.id}
              src={product.image}
              alt={product.name}
              className="slider-image"
              onClick={() => setSelectedProduct(product)}
              style={{ cursor: "pointer" }}
            />
          ))}
        </div>

        <button className="slider-arrow right" onClick={scrollRight}>
          &#8594;
        </button>
      </div>

      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onAddToCart={handleAddToCart}
        />
      )}
    </div>
  );
};

export default NewCollection;
