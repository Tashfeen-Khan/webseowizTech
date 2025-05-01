const fs = require('fs');
const path = require('path');
const Product = require('../models/productModel');

// Get all products
const getProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (err) {
    next(err);
  }
};

// Create product with file upload
const createProduct = async (req, res, next) => {
  try {
    const productData = {
      productName: req.body.productName,
      productDis: req.body.productDis,
      productImg: req.file ? req.file.filename : null
    };
    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (err) {
    next(err);
  }
};

// Update product and optionally replace img
const updateProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (req.file && product.productImg) {
      fs.unlinkSync(path.join('uploads', product.productImg)); // delete old file
    }

    const updatedProduct = await Product.findByIdAndUpdate(
      req.params.id,
      {
        ...req.body,
        productImg: req.file ? req.file.filename : product.productImg
      },
      { new: true }
    );

    res.status(200).json(updatedProduct);
  } catch (err) {
    next(err);
  }
};

// Delete product and associated file
const deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    if (product.productImg) {
      fs.unlinkSync(path.join('uploads', product.productImg));
    }

    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted' });
  } catch (err) {
    next(err);
  }
};
// Get single product by ID
const getSingleProduct = async (req, res, next) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    res.status(200).json(product);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getSingleProduct,
};
