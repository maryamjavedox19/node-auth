const jwt = require('jsonwebtoken');
const User = require('../models/User');

// this middleware will check the authentication status
const requireAuth = (req, res, next) => {
  const token = req.cookies.jwt;

  // check json web token exists & is verified
  if (token) {
    jwt.verify(token, 'net ninja secret', (err, decodedToken) => {   //secod agument is secret we used 
      if (err) {
        console.log(err.message);
        res.redirect('/login');
      } else {
        console.log(decodedToken);
        next();   //carry on what you were doing eg sending smoothie page
      }
    });
  } else {
    res.redirect('/login');
  }
};

// check current user
// if user exist injecting them in views
const checkUser = (req, res, next) => {
  const token = req.cookies.jwt;
  if (token) {
    jwt.verify(token, 'net ninja secret', async (err, decodedToken) => {
      if (err) {
        res.locals.user = null;
        next();
      } else {
        let user = await User.findById(decodedToken.id);
        // making accessible in view
        res.locals.user = user;    //if we passes user in view it will give users property
        next();
      }
    });
  } else {
    res.locals.user = null;
    next();
  }
};

module.exports = { requireAuth, checkUser };