const Cart = require('../models/Cart');

const cartGet = async (req, res, next) => {
  try {
    const clientId = req.user._id;
    const cart = await Cart.findOne({clientId});
    const cartItems = await Cart.findById(cart._id).populate('products');
    /* const totalPrice = await Cart.aggregate([
            {$group: {
                    _id: cart._id,
                    total: {$sum: '$price'}}}]);
        console.log(totalPrice);*/
    return res.render('cart', {products: cartItems.products, user: req.user, cartId: cart._id});
  } catch (err) {
    next(err);
  }
};


module.exports = {
  cartGet,
};
