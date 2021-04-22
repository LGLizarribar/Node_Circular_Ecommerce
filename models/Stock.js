const mongoose = require('mongoose');
const Schema = mongoos.Schema;

const stockSchema = new Schema({
  products: [{type: nomgoose.Types.ObjectId, ref: 'Product'}],
  totalPrice: {type: Number},
},
{
  timestamps: true,
},
);

const Stock = mongoose.model('Stock', stockSchema);

module.exports = Stock;
