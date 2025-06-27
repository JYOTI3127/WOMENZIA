const Product = require('../../model/products/product');
const Category = require('../../model/products/category');
const cloudinary = require('../../config/cloudinary');

// Create a Product
exports.createProduct = async (req, res) => {
  try {
    if (req.user.role !== 'seller') {
      return res.status(403).json({ success: false, message: 'Only sellers can create products' });
    }

    if (req.files.length > 3) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
      return res.status(400).json({ success: false, message: 'Maximum 3 images allowed' });
    }

    const { name, description, price, category, stock } = req.body;

    const existingCategory = await Category.findById(category);
    if (!existingCategory) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const images = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));

    const product = new Product({
      name,
      description,
      price,
      category,
      stock,
      images,
      createdBy: req.user.id
    });

    await product.save();
    res.status(201).json({ success: true, product });
  } catch (error) {
    console.error(error);
    if (req.files) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Add Product Images
exports.addProductImages = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (product.images.length + req.files.length > 3) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
      return res.status(400).json({ success: false, message: 'Max 3 images allowed per product' });
    }

    const newImages = req.files.map(file => ({
      url: file.path,
      public_id: file.filename
    }));

    product.images.push(...newImages);
    await product.save();

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    if (req.files) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get All Products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find()
      .populate('category', 'name')
      .populate('createdBy', 'name email');

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get Products by Category ID
exports.getProductsByCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const categoryExists = await Category.findById(categoryId);
    if (!categoryExists) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    const products = await Product.find({ category: categoryId })
      .populate('category', 'name')
      .populate('createdBy', 'name email');

    res.status(200).json({ success: true, count: products.length, products });
  } catch (error) {
    console.error('Error fetching products by category:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};

// Get Product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)
      .populate('category', 'name')
      .populate('createdBy', 'name email');

    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update Product
exports.updateProduct = async (req, res) => {
  try {
    if (req.files && req.files.length > 3) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
      return res.status(400).json({ success: false, message: 'Maximum 3 images allowed' });
    }

    const { name, description, price, category, stock } = req.body;
    const product = await Product.findById(req.params.id);
    if (!product) {
      if (req.files) {
        await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
      }
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    if (category) {
      const existingCategory = await Category.findById(category);
      if (!existingCategory) {
        if (req.files) {
          await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
        }
        return res.status(404).json({ success: false, message: 'Category not found' });
      }
    }

    if (req.files && req.files.length > 0) {
      await Promise.all(product.images.map(img => cloudinary.uploader.destroy(img.public_id)));
      product.images = req.files.map(file => ({
        url: file.path,
        public_id: file.filename
      }));
    }

    product.name = name || product.name;
    product.description = description || product.description;
    product.price = price || product.price;
    product.category = category || product.category;
    product.stock = stock || product.stock;

    await product.save();
    res.status(200).json({ success: true, product });
  } catch (error) {
    console.error(error);
    if (req.files) {
      await Promise.all(req.files.map(file => cloudinary.uploader.destroy(file.filename)));
    }
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete Product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ success: false, message: 'Product not found' });
    }

    await Promise.all(product.images.map(img => cloudinary.uploader.destroy(img.public_id)));
    await product.deleteOne();

    res.status(200).json({ success: true, message: 'Product and images deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
};
