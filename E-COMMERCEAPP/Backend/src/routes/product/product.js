const express = require('express');
const router = express.Router();
const upload = require('../../middleware/cloudinaryUploader');

const {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
  getProductsByCategory,
  addProductImages
} = require('../../controller/products/product');

const {
  createCategory,
  getAllCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../../controller/products/category');

const { authMiddleware, authorizeRoles } = require('../../middleware/auth');

// Product Routes
router.post('/products', authMiddleware, authorizeRoles('seller'), upload.array('images', 3), createProduct);
router.get('/products', getAllProducts);
router.get('/products/category/:categoryId', getProductsByCategory);
router.put('/products/:id', authMiddleware, authorizeRoles('seller'), upload.array('images', 3), updateProduct);
router.delete('/products/:id', authMiddleware, authorizeRoles('seller'), deleteProduct);
router.post('/products/:id/images', authMiddleware, authorizeRoles('seller'), upload.array('images', 3), addProductImages);

// Category Routes
router.post('/categories', authMiddleware, authorizeRoles('seller'), createCategory);
router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.put('/categories/:id', authMiddleware, authorizeRoles('seller'), updateCategory);
router.delete('/categories/:id', authMiddleware, authorizeRoles('seller'), deleteCategory);

module.exports = router;
