const Cart = require('../../model/products/cart');
const Product = require('../../model/products/product');

// Helper to validate quantity
const isValidQuantity = (quantity) => Number.isInteger(quantity) && quantity > 0;

// Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    if (!productId || !isValidQuantity(quantity)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID or quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (quantity > product.stock) {
      return res.status(400).json({ success: false, message: `Only ${product.stock} items left in stock` });
    }

    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }]
      });
    } else {
      const existingItem = cart.items.find(item => item.product.toString() === productId);

      if (existingItem) {
        const newQuantity = existingItem.quantity + quantity;
        if (newQuantity > product.stock) {
          return res.status(400).json({ success: false, message: `Only ${product.stock} items left in stock` });
        }
        existingItem.quantity = newQuantity;
      } else {
        cart.items.push({ product: productId, quantity });
      }
    }

    await cart.save();
    const populatedCart = await cart.populate('items.product');
    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error('Add to cart error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Get user's cart
exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
    if (!cart) return res.status(200).json({ success: true, cart: { items: [] } });

    res.status(200).json({ success: true, cart });
  } catch (error) {
    console.error('Get cart error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Update quantity of a cart item
exports.updateCartItem = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    if (!productId || !isValidQuantity(quantity)) {
      return res.status(400).json({ success: false, message: 'Invalid product ID or quantity' });
    }

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ success: false, message: 'Product not found' });

    if (quantity > product.stock) {
      return res.status(400).json({ success: false, message: `Only ${product.stock} items left in stock` });
    }

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const item = cart.items.find(item => item.product.toString() === productId);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found in cart' });

    item.quantity = quantity;
    await cart.save();

    const populatedCart = await cart.populate('items.product');
    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error('Update cart item error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Remove item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    if (!productId) return res.status(400).json({ success: false, message: 'Product ID is required' });

    const cart = await Cart.findOne({ user: req.user.id });
    if (!cart) return res.status(404).json({ success: false, message: 'Cart not found' });

    const itemExists = cart.items.some(item => item.product.toString() === productId);
    if (!itemExists) return res.status(404).json({ success: false, message: 'Item not found in cart' });

    cart.items = cart.items.filter(item => item.product.toString() !== productId);
    await cart.save();

    const populatedCart = await cart.populate('items.product');
    res.status(200).json({ success: true, cart: populatedCart });
  } catch (error) {
    console.error('Remove from cart error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};

// Clear entire cart
exports.clearCart = async (req, res) => {
  try {
    const result = await Cart.findOneAndDelete({ user: req.user.id });
    if (!result) {
      return res.status(404).json({ success: false, message: 'Cart already empty or not found' });
    }

    res.status(200).json({ success: true, message: 'Cart cleared successfully' });
  } catch (error) {
    console.error('Clear cart error:', error);
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' });
  }
};
