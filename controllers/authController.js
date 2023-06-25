const User = require("../models/User");  //importing user model
const jwt = require('jsonwebtoken');  //to create json web tokens


// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);   //error code is for unique key from schema

  // errors object
  let errors = { email: '', password: '' };  //this will send back to user if theres email error then email property otherwise password property

  // duplicate email error
  if (err.code === 11000) {   //11000 is an error code for duplicate
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (err.message.includes('user validation failed')) {

    // we are taking values of object which are email and password errors 
    //here errors is our object 
    //using for each since its an array   //we are getting properties of error eg what error is and if its email or password etc
    //^^^^^^                                 ^
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;     //path value is email so to access email we are using path which is key 
      //^we are updating errors object we made with different msgs we have
    });
  }

  return errors;
}

// create json web token
const maxAge = 3 * 24 * 60 * 60;   //value of 3 days in sec
const createToken = (id) => {   //id of user 
  return jwt.sign({ id }, 'net ninja secret', {   //arguments: object id, secret, object about how long jwt should remain valid
    expiresIn: maxAge
  });
};


// controller actions
module.exports.signup_get = (req, res) => {
    res.render('signup');
  }
  
  module.exports.login_get = (req, res) => {
    res.render('login');
  }
  
  module.exports.signup_post = async (req, res) => {    //async bcs we are using await
    const { email, password } = req.body;
   //creating new user in database with these properties using user model

   try {
    // we want to wait until thats completed and promise has resolves then we get user and store it in varoable thats why we using await here
    const user = await User.create({ email, password });  //create creates an instance of user locally and save it to database
    const token = createToken(user._id);  //crate token
    res.cookie('jwt', token, { httpOnly: true, maxAge: maxAge * 1000 });//token inside cookie
    //args:  cookiename, value, options object ^^^    age:3days
    res.status(201).json({ user: user._id });   //sending an user object as json to whatever has sent request
  }


  catch(err) {
    const errors = handleErrors(err);
    res.status(400).json({errors});
  }
  }

  // every request we make cookie is going to be send to server so server could check data and verify 
  
  module.exports.login_post = async (req, res) => {
    const { email, password } = req.body;
    console.log(email, password);
    res.send('user login');
  }