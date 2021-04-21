const express = require('express');
const passport = require('passport');

const router = express.router();

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

module.exports = router;
