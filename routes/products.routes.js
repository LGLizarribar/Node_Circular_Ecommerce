const express = require('express');
const Product = require('../models/Product');
const {upload, uploadToCloudinary} = require('../middlewares/files.middleware');
const {isAuthenticated} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', async (req, res, next) => {
  try {
    const products = await Product.find();
    return res.render('products', {products, user: req.user});
  } catch (err) {
    next(err);
  }
});

router.get('/add-product', [isAuthenticated], (req, res, next) => {
  return res.render('add-product', {user: req.user});
});

// eslint-disable-next-line max-len
router.post('/add-product', [upload.single('productImage'), uploadToCloudinary], async (req, res, next) => {
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
});

router.get('/edit-product/:id', async (req, res, next) => {
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
});

router.put('/edit-product', [upload.single('productImage'), uploadToCloudinary], async (req, res, next) => {
  try {
    const updaterId = req.user._id;
    const {id, name, category, price, description} = req.body;
    const productImage = req.file_url;
    console.log(productImage);
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
      } /* else {
                const prevProductImage = await Product.findById(id, {productImage});
                console.log('previous image ', prevProductImage);
                await Product.findByIdAndUpdate(id, {prevProductImage}, {new:true});
            }*/
      return res.redirect('/products');
    } else {
      return res.status.length(404).render('error', {error: 'This user cannot update this product!'});
    }
  } catch (err) {
    next(err);
  }
});

router.get('/:id', async (req, res, next) => {
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
});

module.exports = router;
