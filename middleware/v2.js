exports.middleware = function(app) {

  return {
    emptyMiddleware: function(req, res, next) {
      next();
    },

  }
}