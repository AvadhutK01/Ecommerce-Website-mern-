const express = require('express');
const { getAllProducts, createProduct, updateProduct, deleteProduct, getProductDetails } = require('../controllers/productController');
const { isAuth } = require('../middlewares/auth')

const productRouter = express.Router();

productRouter.route('/products').get(getAllProducts);

productRouter.route('/admin/product/new').post(isAuth, authorizeRole('Admin'), createProduct);

productRouter.route('/admin/product/:id').put(isAuth, authorizeRole('Admin'), updateProduct).delete(isAuth, authorizeRole('Admin'), deleteProduct);

productRouter.route('/product/:id').get(getProductDetails);


module.exports = productRouter;