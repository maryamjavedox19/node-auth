const jwt = require('jsonwebtoken');

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

module.exports = { requireAuth };