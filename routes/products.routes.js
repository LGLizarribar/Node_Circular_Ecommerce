const express = require('express');
const productsController = require('../controllers/products.contoller');
const {upload, uploadToCloudinary} = require('../middlewares/files.middleware');
const {isAuthenticated, isSameUser} = require('../middlewares/auth.middleware');

const router = express.Router();

router.get('/', productsController.productsGet);

router.get('/add-product', [isAuthenticated], productsController.addProductGet);

// eslint-disable-next-line max-len
router.post('/add-product', [upload.single('productImage'), uploadToCloudinary], productsController.addProductPost );

router.get('/edit-product/:id', [isSameUser], productsController.editProductGet);

// eslint-disable-next-line max-len
router.put('/edit-product', [upload.single('productImage'), uploadToCloudinary, isSameUser], productsController.editProductPut);

router.get('/:id', productsController.productByIdGet);

module.exports = router;
