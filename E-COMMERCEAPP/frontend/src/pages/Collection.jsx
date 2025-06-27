import React, { useState } from "react";
import productData from "../data/productData";
import ProductCard from "../components/ProductCard";
import ProductModal from "../components/ProductModal";
import Cart from "../components/Cart";
import Navbar from "../components/Navbar";
import { useCart } from "../components/CartContext";
// Assuming AuthContext is set up - for demo, user is always logged in:
const useAuth = () => ({ user: { name: "Test User" } }); 

const Collection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchText, setSearchText] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const { items, addItem, removeItem } = useCart();
  const { user } = useAuth();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const categories = ["All", "Top", "Dress", "Bag", "Winter", "High-Heels"];

  const filteredProducts = productData.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchText.toLowerCase())
  );

  const handleAddToCart = (product, size) => {
    if (!user) {
      alert("Please login first"); // Replace with your auth modal logic
      return;
    }
    addItem({ ...product, selectedSize: size });
    setSelectedProduct(null);
    setIsCartOpen(true);
  };

  const toggleCart = () => setIsCartOpen((prev) => !prev);

  console.log("Current cart items in Collection:", items);

  return (
    <>
      {/* <Navbar onCartClick={toggleCart} /> */}
      <div className="collection-container">
        <aside className="sidebar">
          <h3>Categories</h3>
          {categories.map((cat) => (
            <button key={cat} onClick={() => setSelectedCategory(cat)}>
              {cat}
            </button>
          ))}
        </aside>
        <main className="main-content">
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <div className="products-grid">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))
            ) : (
              <p>No products found.</p>
            )}
          </div>
        </main>

        {selectedProduct && (
          <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
            onAddToCart={handleAddToCart}
          />
        )}

        {isCartOpen && <Cart cartItems={items} onRemove={removeItem} />}
      </div>
    </>
  );
};

export default Collection;
