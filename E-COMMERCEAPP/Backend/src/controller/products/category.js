const Category = require('../../model/products/category');

// Create Category
exports.createCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    // Check if category already exists
    const existing = await Category.findOne({ name: name.trim() });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category already exists' });
    }

    const category = await Category.create({ name, description });
    res.status(201).json({ success: true, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Server error while creating category' });
  }
};


// Add Subcategory to Category
exports.addSubcategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const { subcategory } = req.body;

    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    if (category.subcategories.includes(subcategory)) {
      return res.status(400).json({ success: false, message: 'Subcategory already exists' });
    }

    category.subcategories.push(subcategory);
    await category.save();

    res.status(200).json({ success: true, message: 'Subcategory added', category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to add subcategory' });
  }
};










// Get All Categories
exports.getAllCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({ createdAt: -1 });
    res.status(200).json({ success: true, count: categories.length, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error fetching categories' });
  }
};

// Get Category by ID
exports.getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id);
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }
    res.status(200).json({ success: true, category });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Error retrieving category' });
  }
};

// Update Category
exports.updateCategory = async (req, res) => {
  try {
    const { name, description } = req.body;

    const updated = await Category.findByIdAndUpdate(
      req.params.id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updated) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, category: updated });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to update category' });
  }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
  try {
    const deleted = await Category.findByIdAndDelete(req.params.id);
    if (!deleted) {
      return res.status(404).json({ success: false, message: 'Category not found' });
    }

    res.status(200).json({ success: true, message: 'Category deleted successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Failed to delete category' });
  }
};
