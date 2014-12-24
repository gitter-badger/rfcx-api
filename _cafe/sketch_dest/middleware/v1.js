(function() {
  var c;

  c = console.log;

  exports.middleware = {
    justPrintSomething: function(req, res, next) {
      c('middleware here');
      return next();
    }
  };

}).call(this);
