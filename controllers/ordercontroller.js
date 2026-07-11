exports.createOrder = asyncHandler(async (req, res) => {
  const cart = await Cart.findOne({ user: req.user.id }).populate('items.product');
  if (!cart || cart.items.length === 0) throw new AppError('Cart is empty', 400);

  let totalPrice = 0;
  for (let item of cart.items) {
    if (item.product.stock < item.quantity) {
        throw new AppError(`Not enough stock for ${item.product.name}`, 400);
    }
    totalPrice += item.product.price * item.quantity;
    item.product.stock -= item.quantity;
    await item.product.save();
  }

  const order = await Order.create({
    user: req.user.id,
    items: cart.items.map(i => ({
        product: i.product._id,
        name: i.product.name,
        price: i.product.price,
        quantity: i.quantity
    })),
    totalPrice,
    shippingAddress: req.body.shippingAddress
  });
  
  await Cart.findOneAndUpdate({ user: req.user.id }, { items: [], totalPrice: 0 });
  res.status(201).json({ status: 'success', data: order });
});