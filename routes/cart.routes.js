const express = require('express');
const cartController = require('../controllers/cart.controller');


const router = express.Router();

router.get('/', cartController.cartGet);

router.put('/buy', cartController.BuyPost);

module.exports = router;
