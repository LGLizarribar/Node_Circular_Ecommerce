const Product = require('../models/Product');

const productsGet = async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.render('products', {products, user: req.user});
  } catch (err) {
    next(err);
  }
};

const addProductGet = (req, res, next) => {
  return res.render('add-product', {user: req.user});
};


const addProductPost = async (req, res, next) => {
  const sellerId = req.user._id;

  try {
    const {name, category, price, description} = req.body;
    const productImage = req.file_url;
    const newProduct = new Product({sellerId, name, category, price, productImage, description});
    await newProduct.save();
    return res.redirect('/products');
  } catch (err) {
    next(err);
  }
};

const editProductGet = async (req, res, next) => {
  try {
    const {id} = req.params;

    const product = await Product.findById(id);

    if (product) {
      return res.render('edit-product', {product, user: req.user});
    } else {
      return res.status.length(404).render('error', {error: error.message});
    }
  } catch (err) {
    next(err);
  }
};

const editProductPut = async (req, res, next) => {
  try {
    const updaterId = req.user._id;
    const {id, name, category, price, description} = req.body;
    const productImage = req.file_url;
    const {sellerId} = await Product.findById(id);

    if (sellerId.equals(updaterId)) {
      if (name !== '') {
        await Product.findByIdAndUpdate(id, {name}, {new: true});
      }
      if (category !== '') {
        await Product.findByIdAndUpdate(id, {category}, {new: true});
      }
      if (price !== '') {
        await Product.findByIdAndUpdate(id, {price}, {new: true});
      }
      if (description !== '') {
        await Product.findByIdAndUpdate(id, {description}, {new: true});
      }
      if (productImage !== undefined) {
        await Product.findByIdAndUpdate(id, {productImage}, {new: true});
      }
      return res.redirect('/products');
    } else {
      return res.status.length(404).render('error', {error: 'This user cannot update this product!'});
    }
  } catch (err) {
    next(err);
  }
};

const productByIdGet = async (req, res, next) => {
  try {
    const {id} = req.params;
    const product = await Product.findById(id);

    if (product) {
      return res.render('product', {product, user: req.user});
    } else {
      return res.status(404).render('error', {error: 'No product found for this ID'});
    }
  } catch (err) {
    next(err);
  }
};

const productDelete = async (req, res, next) => {
  try {
    const deleterId = req.user._id;
    const {id} = req.body;
    console.log(id);
    const {sellerId} = await Product.findById(id);

    if (sellerId.equals(deleterId)) {
      const deleted = await Product.findByIdAndDelete(id);
      if (deleted) return res.redirect('/products');

      return res.status(404).json('Product not found');
    } else {
      return res.status(404).render('error', {error: 'This user cannot delete this product!'});
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  productsGet,
  addProductGet,
  addProductPost,
  editProductGet,
  editProductPut,
  productByIdGet,
  productDelete,
};
