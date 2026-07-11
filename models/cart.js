const mongoose = require('mongoose');

const cartSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'Cart must belong to a valid user'],
    unique: true
  },
  items: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: [true, 'Cart item must have a valid product ID']
      },
      quantity: {
        type: Number,
        required: [true, 'Product quantity is required'],
        min: [1, 'Quantity cannot be less than 1'],
        default: 1
      },
      price: {
        type: Number,
        required: [true, 'Product price is required']
      }
    }
  ],
  totalPrice: {
    type: Number,
    required: [true, 'Cart must track a total price'],
    default: 0
  }
}, { timestamps: true });

module.exports = mongoose.model('Cart', cartSchema);