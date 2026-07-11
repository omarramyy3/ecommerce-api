const Order = require('../models/Order');
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

exports.createOrder = asyncHandler(async (req, res, next) => {
  const { shippingAddress } = req.body;

  const userId = req.body.user || "665f1234e1b2c3d4e5f6a7b8";

  if (!shippingAddress) {
    return next(new AppError('Shipping address is required to process order', 400));
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart || cart.items.length === 0) {
    return next(new AppError('Your cart is currently empty', 400));
  }

  for (const item of cart.items) {
    const product = await Product.findById(item.product);
    if (!product || product.stock < item.quantity) {
      return next(new AppError(`Product "${product?.name || 'Unknown'}" is out of stock`, 400));
    }
  }

  for (const item of cart.items) {
    await Product.findByIdAndUpdate(item.product, {
      $inc: { stock: -item.quantity }
    });
  }

  const orderNumber = 'ORD-' + Date.now() + '-' + Math.floor(Math.random() * 1000);

  const orderItems = cart.items.map(item => ({
    product: item.product,
    quantity: item.quantity,
    price: item.price
  }));

  const order = await Order.create({
    user: userId,
    orderNumber,
    items: orderItems,
    totalAmount: cart.totalPrice,
    shippingAddress,
    status: 'Pending'
  });

  cart.items = [];
  cart.totalPrice = 0;
  await cart.save();

  res.status(201).json({
    status: 'success',
    data: { order }
  });
});

exports.getAllOrders = asyncHandler(async (req, res, next) => {
  const orders = await Order.find().populate('items.product', 'name price');
  
  res.status(200).json({
    status: 'success',
    results: orders.length,
    data: { orders }
  });
});

exports.getOrderById = asyncHandler(async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate('items.product', 'name price');
  
  if (!order) {
    return next(new AppError('Order track records not found matching that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { order }
  });
});

exports.updateOrderStatus = asyncHandler(async (req, res, next) => {
  const { status } = req.body;

  const validStatuses = ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'];
  if (!validStatuses.includes(status)) {
    return next(new AppError('Invalid order status value submitted', 400));
  }

  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status },
    { new: true, runValidators: true }
  );

  if (!order) {
    return next(new AppError('No order target found matching that ID string', 404));
  }

  res.status(200).json({
    status: 'success',
    data: { order }
  });
});