const Cart = require('../models/Cart');
const Product = require('../models/Product');

const cartGet = async (req, res, next) => {
  try {
    const clientId = req.user._id;
    const cart = await Cart.findOne({clientId});
    if (cart) {
      const cartId = cart._id;
      const cartItems = await Cart.findById(cartId).populate('products');
      const products = cartItems.products;
      let totalPrice = 0;
      products.forEach((item) => {
        totalPrice += item.price;
        return totalPrice;
      });
      const floatPrice = parseFloat(totalPrice).toFixed(2);
      return res.render('cart', {products, user: req.user, cartId, totalPrice: floatPrice});
    };
    return res.redirect('/products');
  } catch (err) {
    next(err);
  }
};

const BuyPost = async (req, res, next) => {
  try {
    const updateState = async (id) => {
      await Product.findByIdAndUpdate(id, {status: 'sold'}, {new: true});
    };
    const cartId = req.body.id;
    const cartItems = await Cart.findById(cartId).populate('products');
    for (const i of cartItems.products) {
      updateState(i.id);
    }
    await Cart.findByIdAndDelete(cartId);
    return res.redirect('/products');
  } catch (error) {
    next(error);
  }
};


module.exports = {
  cartGet,
  BuyPost,
};
