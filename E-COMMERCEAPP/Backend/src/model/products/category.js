const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    enum: ['Beauty Products', 'Purses', 'Jewelry', 'Skincare', 'Haircare', 'Women Clothing'], // Women-only categories
  },
  description: {
    type: String,
    trim: true
  },
  subcategories: [{
    type: String,
    trim: true
  }]
}, { timestamps: true });

module.exports = mongoose.model('Category', categorySchema);
