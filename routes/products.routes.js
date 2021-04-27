const express = require('express');
const productsController = require('../controllers/products.contoller');
const {upload, uploadToCloudinary} = require('../middlewares/files.middleware');
const {isAuthenticated, isSameUser} = require('../middlewares/auth.middleware');


const router = express.Router();

router.get('/', productsController.productsGet);

router.get('/add-product', [isAuthenticated], productsController.addProductGet);

router.post(
    '/add-product',
    [upload.single('productImage'), uploadToCloudinary],
    productsController.addProductPost,
);

router.get('/edit-product/:id', [isSameUser], productsController.editProductGet);

router.put(
    '/edit-product',
    [upload.single('productImage'), uploadToCloudinary],
    productsController.editProductPut,
);

router.delete('/delete-product', [isAuthenticated], productsController.productDelete);

router.put('/add-to-cart', [isAuthenticated], productsController.addToCartPut);

router.get('/:id', productsController.productByIdGet);

module.exports = router;
