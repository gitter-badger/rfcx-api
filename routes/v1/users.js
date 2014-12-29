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
    hash: "$2a$10$kIHo25xb5wbaCfSKVqVCFOo/FaD/taQ0Vyuv6pPs8hLqycGlWU8z6",
    salt: "$2a$10$kIHo25xb5wbaCfSKVqVCFO"
  },
  'michelle': {
    username: 'michelle',
    hash: "$2a$10$1ujYwxthXOgLtxWEFuNXfOFs88sbijSkPWgRzXGmkBKsiJLre1Aly",
    salt: "$2a$10$1ujYwxthXOgLtxWEFuNXfO"
  },
  'stefan': {
    username: 'stefan',
    hash: "$2a$10$Myf4VAnqB/bx.uicqQZsnu6psvbkCCwl.vnVE9rl2NV7/ebPjM/Mi",
    salt: "$2a$10$Myf4VAnqB/bx.uicqQZsnu"
  },
  'topher': {
    username: 'topher',
    hash: "$2a$10$2QSPbakDS5r809t2acaKhe7tdq6HbJ8.o0ciDg0ZuFd3U1AO7HpKG",
    salt: "$2a$10$2QSPbakDS5r809t2acaKhe"
  },
  'wylie': {
    username: 'wylie',
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
            done(null, tempUserOb[username].username, {user: username});
          } else {
            done(null, false, {message: 'incorrect password'});
          }
        }
      });
    } else {
      done(null, false, {message: 'no such user'});
    }
}));

  router.route("/jwt_test")
    .get(function(req, res) {
      if (req.user) {
        res.send('good');
      } else {
        //res.json({'bad': 'no user'});
        res.redirect('gate');
      }
    });

  router.route("/gate")

    .get(function(req, res) {
      res.render('passport_test');
    })

    .post(function(req, res) {
      passport.authenticate('local-login', {session: false}, function(err, user, info) {
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



