// could move requirements to an api which is injected to everything
var _ = require('lodash');
var bcrypt = require('bcrypt-nodejs');
var uid = require('node-uuid');
var c = console.log;
var models  = require('../../models');
var express = require('express');
var router = express.Router();
var LocalStrategy= require('passport-local').Strategy;
var tempUserOb = {
  'kevin': {
    hash: '$2a$10$JVtz0/3g2UBW8Fx7X2yVmOdOIMLe0hc.BB0xe0TrkhqlzmbD9FrXe',
    salt: '$2a$10$JVtz0/3g2UBW8Fx7X2yVmO'
  },
  'stefan': {
    hash: "$2a$10$WbeQh4Iul7C9mqgKaE.n/efqXU7vurjcQ.lxPFUtU2tsMnfC.lWVe",
    salt: "$2a$10$WbeQh4Iul7C9mqgKaE.n/e"
  },
  'topher': {
    hash: "$2a$10$60vaAl/S4/bU9xFZaj88CuZAkCWY9hZdZAnPLrDhjoH.ZoPLMuB8a",
    salt: "$2a$10$60vaAl/S4/bU9xFZaj88Cu"
  },
  'wylie': {
    hash: "$2a$10$CDEKJXYcYZphDakb0BOlGOyWVlgjNYjs.crikXAllbiipKeFeqCF.",
    salt: "$2a$10$CDEKJXYcYZphDakb0BOlGO"
  }
};

module.exports = function (app, passport) {

  passport.use('local-login', new LocalStrategy( function (username, password, done) {
    if (_.has(tempUserOb, username)) {
      var salt= tempUserOb[username].salt;
      bcrypt.hash(password, salt, null, function (err, hash) {
        if (err) {
          c(err);
        } else {
          if (hash === tempUserOb[username].hash) {
            done(null, tempUserOb[username]);
          } else {
            done(null, false);
          }
        }
      });
    } else {
      done(null, false);
    }
}));

  router.route("/passport_test")
    .get(function(req, res) {
      c("hey got");
      res.render('passport_test')
    })
    .post(passport.authenticate('local-login', {session: false, successRedirect: '/v1/users', failureRedirect: '/v1/users/passport_test'}));


  router.route("/")
    .get(function(req, res) {
      res.json({name:"list users"});
    })
  ;

  router.route("/:user_id")
    .get(function(req, res) {
      res.json({name:"one user: "+req.params.user_id});
    });

  return router;

};



