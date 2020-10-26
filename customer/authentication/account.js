module.exports = function(passport){
    var express = require('express');
    var router = express.Router();
    const bcrypt = require('bcrypt')

    router.get('/')
    router.get('/login', checkNotAuthenticated, (req, res) => {
      var context = {};
      context.loggedin = false;
      context.error = req.flash('error');
      context.message = req.flash('message');
      res.render('account/login', context);
    })


    router.get('/signup', checkNotAuthenticated, (req, res) => {
      var context = {};
      context.loggedin = false;
      context.error = req.flash('error');
      res.render('account/signup', context);
    })

    router.get('/logout', (req, res) => {
      req.logOut()
      context = {};
      res.render('account/logout', context);
    })

    function checkAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return next()
      }
      res.redirect('/account/login')
    }

    function checkNotAuthenticated(req, res, next) {
      if (req.isAuthenticated()) {
        return res.redirect('/')
      }
      next()
    }


  return router;
}();
