const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Order must be assigned to a user']
  },
  orderNumber: {
    type: String,
    required: [true, 'Order number is required'],
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Order item must specify a valid product ID']
      },
      quantity: {
        type: Number,
        required: [true, 'Order item quantity is required'],
        min: [1, 'Quantity must be at least 1']
      },
      price: {
        type: Number,
        required: [true, 'Snapshot item price is required']
      }
    }
  ],
  totalAmount: {
    type: Number,
    required: [true, 'Order total amount is required'],
    default: 0.0
  },
  shippingAddress: {
    type: String,
    required: [true, 'Shipping address is required']
  },
  status: {
    type: String,
    required: [true, 'Order status code is required'],
    enum: {
      values: ['Pending', 'Processing', 'Shipped', 'Delivered', 'Cancelled'],
      message: 'Status must be Pending, Processing, Shipped, Delivered, or Cancelled'
    },
    default: 'Pending'
  }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);