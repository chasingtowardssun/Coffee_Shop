module.exports = function(){
    var express = require('express');
    var router = express.Router();

    router.get('/login', checkNotAuthenticated, (req, res) => {
      var context = {};
      context.Notloggedin = true;
      context.error = req.flash('error');
      res.render('login', context);
    });

    router.get('/logout', (req, res) => {
      req.logOut();
      context = {};
      context.Notloggedin = true;
      res.render('logout', context);
    });

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
