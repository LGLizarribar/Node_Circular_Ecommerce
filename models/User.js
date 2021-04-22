const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  name: {type: String, required: true},
  surname: {type: String, required: true},
  city: {type: String, required: true},
  email: {type: String, required: true},
  password: {type: String, required: true},
  userImg: {type: String},
  role: {type: String, enum: ['user', 'admin'], default: 'user'},
  products: [{type: mongoose.Types.ObjectId, ref: 'Products'}],
},
{
  timestamps: true,
},
);

const User = mongoose.model('User', userSchema);

module.exports = User;
