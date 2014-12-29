

var c= console.log;
var jwt= require('jwt-simple');

exports.middleware = function(app) {
  return {

    verifyToken: function(req, res, next) {
      var token= (req.query && req.query.token) || (req.body && req.body.token) || req.headers['x-token'];
      if (token) {
        try {
          var decoded= jwt.decode(token, app.get('jwtTokenSecret'));
          if (decoded.exp <= Date.now()) {
            res.end('Access token expired', 400);
          }
          req.user= decoded.iss;
          return next();
        } catch (err) {
          return next();
        }
      } else {
        next();
      }
    },

    justPrintSomething: function(req, res, next) {
      //console.log("This is being printed by the middleware...");
      next();
    },

  }
}