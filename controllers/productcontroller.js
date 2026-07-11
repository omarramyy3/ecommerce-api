exports.getAllProducts = asyncHandler(async (req, res) => {
  const { minPrice, maxPrice, search, category } = req.query;
  let query = {};

  if (minPrice) query.price = { $gte: minPrice };
  if (maxPrice) query.price = { ...query.price, $lte: maxPrice };
  if (search) query.$or = [{ name: new RegExp(search, 'i') }, { description: new RegExp(search, 'i') }];
  if (category) query.category = category;

  const products = await Product.find(query);
  res.status(200).json({ status: 'success', data: products });
});

exports.getProductById = asyncHandler(async (req, res) => {
  const product = await Product.findById(req.params.id).populate('category', 'name description');
  if (!product) throw new AppError('Product not found', 404);
  res.status(200).json({ status: 'success', data: product });
});