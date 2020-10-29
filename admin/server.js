if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express');
const app = express();
const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const flash = require('express-flash');
const session = require('express-session');

const menuRouter = require('./items.js');
const ordersRouter = require('./orders.js');
// const path = require('path');

let handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.enable('trust proxy');
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use(express.urlencoded({ extended: false }));
app.use(flash());
app.use(session({
  secret: "supersecret",
  resave: false,
  saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
// app.use(express.static('views'));
app.use(express.static(__dirname + '/'));



const initializePassport = require('./authentication/passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
);

const users = [
  { id: 9999999,
    name: "Admin",
    email: "admin@coffeeshop.com",
    // password
    password: "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S"
  }
];

app.post('/account/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/account/login',
  failureFlash: true,
}));

app.use('/account', require('./authentication/account.js'));
app.use('/items', checkAuthenticated, menuRouter);
app.use('/orders', checkAuthenticated, ordersRouter);

function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/account/login')
}

app.get('/', checkAuthenticated, (req, res) => {

  var context = {};
  context.name = req.user.name;
  res.render('index', context)
});


app.use(function(req,res){
    res.status(404);
    var context = {};
    context.loggedin = req.isAuthenticated() ? true : false;
    res.render('404', context);
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    var context = {};
    context.loggedin = req.isAuthenticated() ? true : false;
    res.render('500');
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

const port = process.env.PORT | 8080;
console.log(`Listening to port ${port}`)
app.listen(port);

// npm install
// npm start
// localhost:4000
// admin@coffeeshop.com
// password
