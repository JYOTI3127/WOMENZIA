const express = require('express');
const router = express.Router();
const {
  addToCart,
  getCart,
  updateCartItem,
  removeFromCart,
  clearCart
} = require('../../controller/products/cart');

const { authMiddleware } = require('../../middleware/auth');

// Add item to cart
router.post('/add', authMiddleware, addToCart);

// Get current user's cart
router.get('/', authMiddleware, getCart);

// Update quantity of a specific item
router.put('/update', authMiddleware, updateCartItem);

// Remove a specific item from cart
router.delete('/remove/:productId', authMiddleware, removeFromCart);

// Clear entire cart
router.delete('/clear', authMiddleware, clearCart);

module.exports = router;
