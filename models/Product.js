const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: {type: String, required: true},
  category: {type: String, required: true},
  seller: {type: mongoose.Types.ObjectId, ref: 'User'},
  buyer: {type: mongoose.Types.ObjectId, ref: 'User'},
  price: {type: Number, required: true},
},
{
  timestamps: true,
},
);

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
