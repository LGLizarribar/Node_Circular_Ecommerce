const Product = require('../models/Product');

const isAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    return res.redirect('/auth/login');
  }
};

const isAdmin = (req, res, next) => {
  if (req.isAuthenticated()) {
    if (req.user.role === 'admin') {
      return next();
    } else {
      const error = new Error('Forbidden page');
      error.status=403;
      return next(error);
    }
  } else {
    return res.redirect('/auth/login');
  }
};

const isSameUser = async (req, res, next) => {
  try {
    const {id} = req.params;
    console.log(id);
    const updaterId = req.user._id;
    const {sellerId} = await Product.findById(id);
    if (sellerId.equals(updaterId)) {
      return next();
    } else {
      const error = new Error('Forbidden page');
      error.status=403;
      return next(error);
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {isAuthenticated, isAdmin, isSameUser};
