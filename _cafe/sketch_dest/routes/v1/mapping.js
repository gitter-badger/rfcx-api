(function() {
  var c, express, models, router;

  c = console.log;

  models = require('../../models');

  express = require('express');

  router = express.Router();

  router.route('/register').post(function(req, res) {
    var reqMappingUser;
    if (!(!req.body.user)) {
      reqMappingUser = JSON.parse(req.body.user);
      c('req.body.user: ', req.body.user);
      return models.MappingUser.findOrCreate({
        where: {
          guid: reqMappingUser.guid,
          name: reqMappingUser.name
        }
      }).spread(function(dbMappingUser, wasCreated) {
        return res.status(200).json({
          guid: dbMappingUser.guid,
          name: dbMappingUser.name,
          lastCheckIn: dbMappingUser.last_check_in,
          carrier: dbMappingUser.carrier
        });
      });
    } else {
      return res.status(500).json({});
    }
  });

  router.route('/checkin').post(function(req, res) {
    return res.json({
      name: 'one user: ' + req.params.user_id
    });
  });

  module.exports = router;

}).call(this);
