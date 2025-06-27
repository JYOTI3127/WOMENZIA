import React from "react";
import img1 from "../assets/img1.jpg";
import img2 from "../assets/img2.jpg";
import img3 from "../assets/img3.jpg";
import img4 from "../assets/img4.jpg";
import img5 from "../assets/img5.jpg";
import img6 from "../assets/img6.jpg";
import img7 from "../assets/img7.jpg";
import img8 from "../assets/img8.jpg";
import img9 from "../assets/img9.jpg";
import img10 from "../assets/img10.jpg";
import img11 from "../assets/img11.jpg";
import img12 from "../assets/img12.jpg";
import "../App.css";


const products = [
  { id: 1, name: "Stylish Dress", price: "₹399", description: "Elegant cotton dress, perfect for summer wear.", image: img6 },
  { id: 2, name: "Summer Top", price: "₹299", description: "Light and breathable top for sunny days.", image: img7 },
  { id: 3, name: "Denim Jacket", price: "₹799", description: "Classic denim jacket with a modern fit.", image: img3 },
  { id: 4, name: "Formal Shirt", price: "₹399", description: "Perfect shirt for office and formal occasions.", image: img12 },
  { id: 5, name: "Casual T-Shirt", price: "₹499", description: "Comfortable and stylish everyday t-shirt.", image: img8 },
  { id: 6, name: "Leather Bag", price: "₹999", description: "High-quality leather bag for all your essentials.", image: img9 },
  { id: 7, name: "High Heels", price: "₹599", description: "Elegant heels to complete your outfit.", image: img10 },
  { id: 8, name: "Winter Coat", price: "₹1290", description: "Warm and stylish coat for winter season.", image: img11 },
];

const BestSeller = () => {
  return (
    <div className="best-seller-section">
      <h2>Best Seller</h2>
      <p>Our best seller — loved by many, styled by all. Elevate your look with timeless charm.</p>
      <div className="bestseller-card-grid">
        {products.map((item) => (
          <div key={item.id} className="bestseller-card">
            <img src={item.image} alt={item.name} />
            <h4>{item.name}</h4>
            <p className="price">{item.price}</p>
            <p className="description">{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BestSeller;
