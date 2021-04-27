const express = require('express');
const authController = require('../controllers/auth.controller');
const {isAdmin} = require('../middlewares/auth.middleware');
const {upload, uploadToCloudinary} = require('../middlewares/files.middleware');


/*eslint-disable */
const router = express.Router();
/* eslint-enable */

router.get('/register', authController.registerGet);
router.post('/register', [upload.single('userImg'), uploadToCloudinary],
    authController.registerPost);

router.get('/login', authController.loginGet);
router.post('/login', authController.loginPost);

router.post('/logout', authController.logoutPost);

router.get('/users', [isAdmin], authController.usersGet);

router.delete('/delete-user', [isAdmin], authController.userDelete);

module.exports = router;
