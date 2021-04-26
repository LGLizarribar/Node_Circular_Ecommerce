const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cartSchema = new Schema({
  clientId: {type: mongoose.Types.ObjectId, ref: 'User'},
  products: [{type: mongoose.Types.ObjectId, ref: 'Product'}],
  totalPrice: {type: Number},
},
{
  timestamps: true,
},
);

const Cart = mongoose.model('Cart', cartSchema);

module.exports = Cart;
