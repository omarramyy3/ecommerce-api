const Product = require('../models/Product');
const Category = require('../models/Category');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.getAllProducts = asyncHandler(async (req, res, next) => {
  const queryObj = {};
  
  if (req.query.category) {
    queryObj.category = req.query.category;
  }
  
  if (req.query.inStock) {
    queryObj.inStock = req.query.inStock === 'true';
  }
  
  if (req.query.minPrice || req.query.maxPrice) {
    queryObj.price = {};
    if (req.query.minPrice) queryObj.price.$gte = Number(req.query.minPrice);
    if (req.query.maxPrice) queryObj.price.$lte = Number(req.query.maxPrice);
  }
 
  if (req.query.search) {
    queryObj.$or = [
      { name: { $regex: req.query.search, $options: 'i' } },
      { description: { $regex: req.query.search, $options: 'i' } }
    ];
  }

  const products = await Product.find(queryObj).populate('category', 'name description');
  
  res.status(200).json({
    status: 'success',
    results: products.length,
    data: { products }
  });
});

exports.getProductById = asyncHandler(async (req, res, next) => {
  const product = await Product.findById(req.params.id).populate('category', 'name description');
  
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: { product }
  });
});

exports.createProduct = asyncHandler(async (req, res, next) => {
  const categoryExists = await Category.findById(req.body.category);
  if (!categoryExists) {
    return next(new AppError('Category not found', 404));
  }

  const newProduct = await Product.create(req.body);
  
  res.status(201).json({
    status: 'success',
    data: { product: newProduct }
  });
});

exports.updateProduct = asyncHandler(async (req, res, next) => {
  if (req.body.category) {
    const categoryExists = await Category.findById(req.body.category);
    if (!categoryExists) {
      return next(new AppError('Category not found', 404));
    }
  }

  const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  
  if (!updatedProduct) {
    return next(new AppError('Product not found', 404));
  }
  
  res.status(200).json({
    status: 'success',
    data: { product: updatedProduct }
  });
});

exports.deleteProduct = asyncHandler(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id);
  
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  
  res.status(200).json({
    status: 'success',
    message: 'Product deleted successfully'
  });
});