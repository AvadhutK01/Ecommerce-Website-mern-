const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');

const productRouter = express.Router();

productRouter.route('/products').get(getAllProducts);

productRouter.route('/product/new').post(createProduct);

productRouter.route('product/:id').put(updateProduct).delete(deleteProduct).get(getProductDetails);


module.exports = productRouter;