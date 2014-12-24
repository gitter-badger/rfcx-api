# middleware v1 middleware
c= console.log
exports.middleware=
  justPrintSomething: (req, res, next)->
    c 'middleware here'
    next()