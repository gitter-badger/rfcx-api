(function() {
  var express, models, router;

  models = require('../../models');

  express = require('express');

  router = require(express.Router());

  router.route('/').get(function(req, res) {
    return res.json({
      name: "list guardians"
    });
  }).post(function(req, res) {});

  router.route('/:guardian_id').get(function(req, res) {
    return res.json({
      name: "one guardian: " + req.params.guardian_id
    });
  });

  module.exports = router;

}).call(this);
