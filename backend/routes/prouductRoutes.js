const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuth } = require('../middlewares/auth')

const productRouter = express.Router();

productRouter.route('/products').get(getAllProducts);

productRouter.route('/product/new').post(isAuth, authorizeRole('Admin'), createProduct);

productRouter.route('product/:id').put(isAuth, authorizeRole('Admin'), updateProduct).delete(isAuth, authorizeRole('Admin'), deleteProduct).get(getProductDetails);


module.exports = productRouter;