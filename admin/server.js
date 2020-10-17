if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const express = require('express')
const app = express()

const mysql = require('./dbcon.js');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt')
const passport = require('passport')
const flash = require('express-flash')
const session = require('express-session')
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('mysql', mysql);
app.use(express.urlencoded({ extended: false }))
app.use(flash())
app.use(session({
  secret: "supersecret",
  resave: false,
  saveUninitialized: false,
}))
app.use(passport.initialize())
app.use(passport.session())

const initializePassport = require('./authentication/passport-config')
initializePassport(
  passport,
  email => users.find(user => user.email === email),
  id => users.find(user => user.id === id)
)

const users = [
  { id: 9999999,
    name: "Admin",
    email: "admin@coffeeshop.com",
    // password
    password: "$2a$10$I523Fla7Iz.z5KLQqSqdie6Zf/E/wQTMHAGQTHnij5XZ56haTGO.S"
  }
]

app.post('/account/login', checkNotAuthenticated, passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/account/login',
  failureFlash: true,
}))

app.use('/account', require('./authentication/account.js'));

/*
-------- put your code here--------------------------------------
------------------------------------------------------------------
*/

// 1. add this checkAuthenticated function in your js file
function checkAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return next()
  }
  res.redirect('/account/login')
}

// 2. add checkAuthenticated into your http call function param
app.get('/', checkAuthenticated, (req, res) => {

  var context = {};
  context.name = req.user.name;
  res.render('index', context)
})

/*--------------------------------------------------------------
----------------------------------------------------------------*/
app.use(function(req,res){
    res.status(404);
    res.render('404');
});

app.use(function(err, req, res, next){
    console.error(err.stack);
    res.status(500);
    res.render('500');
});

function checkNotAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {
    return res.redirect('/')
  }
  next()
}

app.listen(4000)
