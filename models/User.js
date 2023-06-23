const mongoose = require('mongoose');  //to create new user model
const { isEmail } = require('validator');  //importing from validator package to validate an email

const userSchema = new mongoose.Schema({    //schema define the structure of user document
    email: {
      type: String,
      required: [true, 'Please enter an email'],     //first value of array is value of key i.e if its required or not. second value is custom error 
      unique: true,    //no user can signup with the same email twice
      lowercase: true,
      validate: [isEmail, 'Please enter a valid email']   //to make sure user enters an email; isemail is basically from package we installed
    },
    password: {
      type: String,
      required: [true, 'Please enter a password'],
      minlength: [6, 'Minimum password length is 6 characters'],
    }
  });
                    
  
//model based on this schema  
  const User = mongoose.model('user', userSchema); // argument(name, schema) ;name must be singular of whatever we define our database collection(users)
  
  module.exports = User;