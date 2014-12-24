(function() {
  var c, express, models, router;

  c = console.log;

  models = require('../../models');

  express = require('express');

  router = express.Router();

  router.route('/').get(function(req, res) {
    return res.json({
      name: 'list users'
    });
  });

  router.route('/:user_id').get(function(req, res) {
    return res.json({
      name: 'one user: ' + req.params.user_id
    });
  });

  module.exports = router;

}).call(this);
