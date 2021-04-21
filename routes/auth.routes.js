const express = require('express');
const passport = require('passport');
const {isAdmin} = require('../middlewares/auth.middleware');
const User = require('../models/User');

/*eslint-disable */
const router = express.Router();
/* eslint-enable */

router.get('/register', (req, res, next) => {
  return res.render('register');
});

router.post('/register', (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    const err = new Error('User and password are required');
    return res.render('register', {err: err.message});
  }

  passport.authenticate('register', (err, user) => {
    if (err) {
      return res.render('register', {err: err.message});
    }
    return res.redirect('/auth/login');
  })(req);
});

router.get('/login', (req, res, next) => {
  return res.render('login');
});

router.post('/login', (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    const err = new Error('User and password are required');
    return res.render('login', {err: err.message});
  }

  passport.authenticate('login', (err, user) => {
    if (err) {
      return res.render('login', {err: err.message});
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.render('login', {err: err.message});
      }
      return res.redirect('/jobs');
    });
  })(req, res, next);
});

router.post('/logout', (req, res, next) => {
  if (req.user) {
    req.logout();

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.redirect('/');
    });
  } else {
    return res.redirect('/auth/login');
  }
});

router.get('/users', [isAdmin], async (req, res, next) => {
  try {
    const users = await User.find();
    return res.render('users', {users: users,
      isAdmin: req.user.role === 'admin', user: req.user});
  } catch (err) {
    next(err);
  }
});

router.delete('/delete-user', [isAdmin], async (req, res, next) => {
  try {
    const {id} = req.body;

    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) return res.redirect('/auth/users');

    return res.status(404).json('User not found');
  } catch (error) {
    next(error);
  }
});

module.exports = router;
