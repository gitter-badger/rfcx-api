// routes users routes

var moment= require('moment');
var jwt= require('jwt-simple');
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
    username: 'kevin',
    hash: '$2a$10$JVtz0/3g2UBW8Fx7X2yVmOdOIMLe0hc.BB0xe0TrkhqlzmbD9FrXe',
    salt: '$2a$10$JVtz0/3g2UBW8Fx7X2yVmO'
  },
  'michelle': {
    username: 'michelle',
    hash: "$2a$10$NK3mBayHtlR8x4fxfkj2Zu7nDGm8NdEKQLNTkpo2TUn9qM6keGeMG",
    salt: "$2a$10$NK3mBayHtlR8x4fxfkj2Zu"
  },
  'stefan': {
    username: 'stefan',
    hash: "$2a$10$WbeQh4Iul7C9mqgKaE.n/efqXU7vurjcQ.lxPFUtU2tsMnfC.lWVe",
    salt: "$2a$10$WbeQh4Iul7C9mqgKaE.n/e"
  },
  'topher': {
    username: 'topher',
    hash: "$2a$10$60vaAl/S4/bU9xFZaj88CuZAkCWY9hZdZAnPLrDhjoH.ZoPLMuB8a",
    salt: "$2a$10$60vaAl/S4/bU9xFZaj88Cu"
  },
  'wylie': {
    username: 'wylie',
    hash: "$2a$10$CDEKJXYcYZphDakb0BOlGOyWVlgjNYjs.crikXAllbiipKeFeqCF.",
    salt: "$2a$10$CDEKJXYcYZphDakb0BOlGO"
  }
};

module.exports = function (app, passport) {

  passport.use('local-login', new LocalStrategy( function (username, password, done) {
    c("in strategy");
    if (_.has(tempUserOb, username)) {
      var salt= tempUserOb[username].salt;
      bcrypt.hash(password, salt, null, function (err, hash) {
        if (err) {
          c(err);
        } else {
          if (hash === tempUserOb[username].hash) {
            done(null, tempUserOb[username], {user: username});
          } else {
            done(null, false, {message: 'incorrect password'});
          }
        }
      });
    } else {
      done(null, false, {message: 'no such user'});
    }
}));

  router.route("/passport_test")

    .get(function(req, res) {
      res.render('passport_test')
    })

    .post(function(req, res) {
      passport.authenticate('local-login', {session: false}, function(err, user, info) {
        c("hey");
        //if (err) {return next(err)}
        if (!user) { return res.json(401, {error: info.message})};
        var expires= moment().add('days', 7).valueOf();
        var token= jwt.encode({
          iss: user,
          exp: expires
        }, app.get('jwtTokenSecret'));
        res.json({token: token, expires: expires, user: info.user});
      })(req, res);
    });



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



