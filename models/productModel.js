const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: [true, 'productName is required']
  },
  productDis: {
    type: String,
    required: [true, 'productDis is required'],
    
  },
 productImg : {
    type: String, // Store the filename or URL
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('product', productSchema);
