const Category = require('../models/category');
const AppError = require('../utils/AppError');
const asyncHandler = require('../utils/asyncHandler');

exports.createCategory = asyncHandler(async (req, res, next) => {
  const { name, description } = req.req.body || req.body;

  const slug = name ? name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '') : '';

  const category = await Category.create({ name, description, slug });
  res.status(201).json({ status: 'success', data: { category } });
});

exports.getAllCategories = asyncHandler(async (req, res, next) => {
  const categories = await Category.find();
  res.status(200).json({ status: 'success', results: categories.length, data: { categories } });
});

exports.getCategoryById = asyncHandler(async (req, res, next) => {
  const category = await Category.findById(req.params.id);
  if (!category) return next(new AppError('No category found with that ID', 404));
  
  res.status(200).json({ status: 'success', data: { category } });
});

exports.updateCategory = asyncHandler(async (req, res, next) => {
  if (req.body.name) {
    req.body.slug = req.body.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');
  }
  const category = await Category.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true
  });
  if (!category) return next(new AppError('No category found with that ID', 404));

  res.status(200).json({ status: 'success', data: { category } });
});

exports.deleteCategory = asyncHandler(async (req, res, next) => {
  const category = await Category.findByIdAndDelete(req.params.id);
  if (!category) return next(new AppError('No category found with that ID', 404));

  res.status(204).json({ status: 'success', data: null });
});