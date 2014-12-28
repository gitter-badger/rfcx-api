// could move requirements to an api which is injected to everything

var bcrypt = require('bcrypt');
var uid = require('node-uuid');
var c = console.log;
var models  = require('../../models');
var express = require('express');
var router = express.Router();

var LocalStrategy= require('passport-local').Strategy

module.exports = function (app, passport) {

  passport.use('local-login', new LocalStrategy( function (username, password, done) {
    if ((username === 'wylie') && (password === 'snth')) {
      done(null, {id: "hey"});
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



