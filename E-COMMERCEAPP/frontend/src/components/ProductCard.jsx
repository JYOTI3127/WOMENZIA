import React from "react";
import "../App.css";

const ProductCard = ({ product, onClick }) => (
  <div className="product-card" onClick={() => onClick(product)}>
    <img src={product.image} alt={product.name} />
    <h4>{product.name}</h4>
    <p>₹{product.price}</p>
  </div>
);

export default ProductCard;
