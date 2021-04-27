const express = require('express');
/*eslint-disable */
const router = express.Router();
/* eslint-enable */

router.get('/', (req, res) => {
  return res.render('index', {
    title: 'Welcome to Circular',
    content: 'Get what you need. Sell what you don\'t.',
    user: req.user,
  });
});

module.exports = router;
