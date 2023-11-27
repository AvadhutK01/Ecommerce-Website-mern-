const Product = require('../models/productModel');
const ErrorHandler = require('../util/errorHandler');
const errorFunc = require('../middlewares/catchErrors');
const ApiFeatures = require('../util/apiFeatures');


//Create Product--Admin
exports.createProduct = errorFunc(async (req, res) => {
    const product = await Product.create(req.body);

    res.status(201).json({
        success: true,
        product
    })
}
)

//Get All Product
exports.getAllProducts = errorFunc(async (req, res) => {

    const resutlPerPage = 5;
    const productCount = await Product.countDocuments();
    const apiFeature = new ApiFeatures(Product.findOne(), req.query).search().filter().pagination(resutlPerPage);
    const products = await apiFeature.query;
    res.status(200).json({
        success: true,
        products,
        productCount
    });
})

//Get single Product
exports.getProductDetails = errorFunc(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found', 404))
    }

    res.status(200).json({
        success: true,
        product
    })
})

//update Products --Admin
exports.updateProduct = errorFunc(async (req, res) => {

    let product = await Product.findById(req.params.id);
    if (!product) {
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
    }
    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })
    res.status(200).json({
        success: true,
        product
    })
})

// Delete Product --admin
exports.deleteProduct = errorFunc(async (res, req) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        if (!product) {
            return next(new ErrorHandler('Product not found', 404))
        }
    }

    await product.remove()

    res.status(200).json({
        success: true,
        message: 'Product Deleted Successfully'
    })
})