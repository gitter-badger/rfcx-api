(function() {
  var c;

  c = console.log;

  exports.middleware = {
    emptyMiddleware: function(req, res, next) {
      return next();
    }
  };

}).call(this);
