const passport = require('passport');
const User = require('../models/User');

const registerGet = (req, res, next) => {
  return res.render('register');
};

const registerPost = (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    const err = new Error('User and password are required');
    return res.render('register', {error: err.message});
  }

  passport.authenticate('register', (err, user) => {
    if (err) {
      return res.render('register', {error: err.message});
    }
    return res.redirect('/auth/login');
  })(req);
};

const loginGet = (req, res, next) => {
  return res.render('login');
};

const loginPost = (req, res, next) => {
  const {email, password} = req.body;

  if (!email || !password) {
    const err = new Error('User and password are required');
    return res.render('login', {error: err.message});
  }

  passport.authenticate('login', (err, user) => {
    if (err) {
      return res.render('login', {error: err.message});
    }
    req.logIn(user, (err) => {
      if (err) {
        return res.render('login', {error: err.message});
      }
      return res.redirect('/');
    });
  })(req, res, next);
};

const logoutPost = (req, res, next) => {
  if (req.user) {
    req.logout();

    req.session.destroy(() => {
      res.clearCookie('connect.sid');
      return res.redirect('/');
    });
  } else {
    return res.redirect('/auth/login');
  }
};

const usersGet = async (req, res, next) => {
  try {
    const users = await User.find();
    return res.render('users', {users: users,
      isAdmin: req.user.role === 'admin', user: req.user});
  } catch (err) {
    next(err);
  }
};

const userDelete = async (req, res, next) => {
  try {
    const {id} = req.body;

    const deletedUser = await User.findByIdAndDelete(id);

    if (deletedUser) return res.redirect('/auth/users');

    return res.status(404).json('User not found');
  } catch (err) {
    next(err);
  }
};


module.exports = {
  registerGet,
  registerPost,
  loginGet,
  loginPost,
  logoutPost,
  usersGet,
  userDelete,
};
