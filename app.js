const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const app = express();
const cookieParser = require('cookie-parser');   //middlewear
 

// middleware
app.use(express.static('public'));
app.use(express.json()); //it takes any json data that comes w a req and passes it into js object



// view engine
app.set('view engine', 'ejs');


// database connection
const dbURI = 'mongodb+srv://mariumox19:brooklyn99@nodetuts.ma1nobr.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true })
  .then((result) => app.listen(3000))
  .catch((err) => console.log(err));



// routes
app.get('/', (req, res) => res.render('home'));
app.get('/smoothies', (req, res) => res.render('smoothies'));
app.use(authRoutes);
app.use(cookieParser());  




// cookies

app.get('/set-cookies', (req, res) => {    //setting cookies

  // res.setHeader('Set-Cookie', 'newUser=true');  // sec arg is coockie balue
  //when we send request to browser it will send this cookie with it
  
  res.cookie('newUser', false);  //does the saame thing as upper 
  res.cookie('isEmployee', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });   //3rd arg is options object  
                            // its one day in milliseconds    , so ts not accessible in frontend
// max age means when cookies should be removed from the browser

  res.send('you got the cookies!');

});

app.get('/read-cookies', (req, res) => {

  const cookies = req.cookies;  //we can access the cookies bcs we are using cookie parser
  console.log(cookies.newUser);
// it passes the cookies into the object for us
  res.json(cookies);

});