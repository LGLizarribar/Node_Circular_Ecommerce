const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  sellerId: {type: mongoose.Types.ObjectId, ref: 'User'},
  buyerId: {type: mongoose.Types.ObjectId, ref: 'User'},
  price: {type: Number, required: true},
  productImage: {type: String},
  description: {type: String, required: true},
},
{
  timestamps: true,
},
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
