(function() {
  var apiVersion, app, env, express, favicon, fs, i, logger, middleware, middlewareFunc, multer, passport, path, routeName, routes, _i, _j, _k, _l, _len, _len1, _len2, _len3, _len4, _m, _ref, _ref1;

  fs = require('fs');

  if (fs.existsSync("./config/env_vars.js")) {
    env = require("./config/env_vars.js").env;
    for (_i = 0, _len = env.length; _i < _len; _i++) {
      i = env[_i];
      process.env[i] = env[i];
    }
  }

  if (process.env.NODE_ENV === 'production') {
    process.env.NEW_RELIC_HOME = __dirname + '/config';
    require('newrelic');
  }

  express = require('express');

  path = require('path');

  favicon = require('serve-favicon');

  logger = require('morgan');

  multer = require('multer');

  passport = require('passport');

  middleware = {};

  app = express();

  app.set("title", "Rainforest Connection API");

  app.set("port", process.env.PORT || 8000);

  app.use(favicon(__dirname + "/public/img/logo/favicon.ico"));

  app.use(logger("dev"));

  app.use(multer(require('./config/multer'))).config(process.env);

  app.use(express["static"](path.join(__dirname, 'public')));

  app.use(passport.initialize());

  routes = {
    "v1": {
      "users": require('./routes/v1/users'),
      "mapping": require('./routes/v1/mapping'),
      "guardians": require('./routes/v1/guardians'),
      "checkins": require('./routes/v1/checkins')
    },
    "v2": {}
  };

  for (_j = 0, _len1 = routes.length; _j < _len1; _j++) {
    apiVersion = routes[_j];
    middleware[apiVersion] = require('./middleware/' + apiVersion + '.js').middleware;
    _ref = middleware[apiVersion];
    for (_k = 0, _len2 = _ref.length; _k < _len2; _k++) {
      middlewareFunc = _ref[_k];
      app.use("/" + apiVersion + "/", middleware[apiVersion][middleWareFunc]);
    }
  }

  for (_l = 0, _len3 = routes.length; _l < _len3; _l++) {
    apiVersion = routes[_l];
    _ref1 = routes[apiVersion];
    for (_m = 0, _len4 = _ref1.length; _m < _len4; _m++) {
      routeName = _ref1[_m];
      app.use('/' + apiVersion + '/' + routeName, routes[apiVersion][routeName]);
    }
  }

  app.get("/health_check", function(req, res) {
    return res.status(200).json({
      rfcx: "awesome"
    });
  });

  app.use(function(req, res, next) {
    var err;
    err = new Error('Not Found');
    err.status = 404;
    return next(err);
  });

  if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
      return res.status(err.status || 500).json({
        message: err.message,
        error: err
      });
    });
  }

  app.use(function(err, req, res, next) {
    return res.status(err.status || 500).json({
      message: err.message,
      error: {}
    });
  });

  module.exports = app;

}).call(this);
