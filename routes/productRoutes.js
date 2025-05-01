const express = require('express');
const router = express.Router();
const upload = require('../middleware/multerUpload');

const {
  getProducts,
  createProduct,
  updateProduct,
  getSingleProduct,
  deleteProduct
} = require('../controllers/productController');

router.get('/', getProducts);
router.get("/:id",getSingleProduct);
router.post('/', upload.single('productImg'), createProduct);
router.put('/:id', upload.single('productImg'), updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;
