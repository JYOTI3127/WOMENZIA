import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductModal = ({ product, onClose, onAddToCart }) => {
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : "");
  const navigate = useNavigate();

  useEffect(() => {
    setSelectedSize(product.sizes ? product.sizes[0] : "");
  }, [product]);

  const handleAdd = () => {
    if (onAddToCart) {
      onAddToCart(product, selectedSize);
      navigate("/cart"); // Add to Cart के बाद cart page पर redirect
    }
  };

  return (
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <img src={product.image} alt={product.name} />
        <h3>{product.name}</h3>
        <p>₹{product.price}</p>
        <label>Select Size:</label>
        <select value={selectedSize} onChange={(e) => setSelectedSize(e.target.value)}>
          {product.sizes?.map((size) => (
            <option key={size} value={size}>
              {size}
            </option>
          ))}
        </select>
        <button onClick={handleAdd}>Add to Cart</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default ProductModal;
