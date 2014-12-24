# middleware v2 middleware
c= console.log
exports.middleware=
  emptyMiddleware: (req, res, next)->
    next()