const Cart = require('../models/Cart');
const Product = require('../models/Product');
const asyncHandler = require('../utils/asyncHandler');
const AppError = require('../utils/AppError');

const calculateTotalPrice = (items) => {
  return items.reduce((acc, item) => acc + item.quantity * item.price, 0);
};

exports.getCart = asyncHandler(async (req, res, next) => {
  const userId = req.body.user || "665f1234e1b2c3d4e5f6a7b8";

  let cart = await Cart.findOne({ user: userId }).populate('items.product');

  if (!cart) {
    cart = await Cart.create({ user: userId, items: [], totalPrice: 0 });
  }

  res.status(200).json({
    status: 'success',
    data: { cart }
  });
});

exports.addItemToCart = asyncHandler(async (req, res, next) => {
  const { productId, quantity } = req.body;
  const itemQty = Number(quantity) || 1;
  const userId = req.body.user || "665f1234e1b2c3d4e5f6a7b8";

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  if (product.stock < itemQty) {
    return next(new AppError('Not enough stock available', 400));
  }

  let cart = await Cart.findOne({ user: userId });
  if (!cart) {
    cart = new Cart({ user: userId, items: [], totalPrice: 0 });
  }

  const existingItemIndex = cart.items.findIndex(
    (item) => item.product.toString() === productId
  );

  if (existingItemIndex > -1) {
    if (product.stock < cart.items[existingItemIndex].quantity + itemQty) {
      return next(new AppError('Cannot add more of this item, stock limit reached', 400));
    }
    cart.items[existingItemIndex].quantity += itemQty;
    cart.items[existingItemIndex].price = product.price;
  } else {
    cart.items.push({
      product: productId,
      quantity: itemQty,
      price: product.price
    });
  }

  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();
  
  await cart.populate('items.product');

  res.status(200).json({
    status: 'success',
    data: { cart }
  });
});

exports.updateCartItem = asyncHandler(async (req, res, next) => {
  const { productId } = req.params;
  const { quantity } = req.body;
  const userId = req.body.user || "665f1234e1b2c3d4e5f6a7b8";

  if (quantity < 0) {
    return next(new AppError('Negative quantities are not allowed', 400));
  }

  const cart = await Cart.findOne({ user: userId });
  if (!cart) return next(new AppError('Cart not found', 404));

  const itemIndex = cart.items.findIndex((item) => item.product.toString() === productId);
  if (itemIndex === -1) return next(new AppError('Item not found in cart', 404));

  const product = await Product.findById(productId);
  if (!product) {
    return next(new AppError('Product no longer exists', 404));
  }

  if (product.stock < quantity) {
    return next(new AppError('Not enough stock available', 400));
  }

  if (quantity === 0) {
    cart.items.splice(itemIndex, 1);
  } else {
    cart.items[itemIndex].quantity = quantity;
    cart.items[itemIndex].price = product.price;
  }

  cart.totalPrice = calculateTotalPrice(cart.items);
  await cart.save();

  await cart.populate('items.product');

  res.status(200).json({
    status: 'success',
    data: { cart }
  });
});

// @desc    Clear Entire Cart
// @route   DELETE /api/cart
exports.clearCart = asyncHandler(async (req, res, next) => {
  const userId = req.body.user || "665f1234e1b2c3d4e5f6a7b8";
  const cart = await Cart.findOne({ user: userId });
  
  if (cart) {
    cart.items = [];
    cart.totalPrice = 0;
    await cart.save();
  }

  res.status(200).json({
    status: 'success',
    message: 'Cart cleared completely',
    data: { cart }
  });
});