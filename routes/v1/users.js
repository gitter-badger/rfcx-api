var models  = require('../../models');
var express = require('express');
var router = express.Router();
var middleware_v1 = require("../../middleware/v1.js").middleware;
for (m in middleware_v1) { router.use(middleware_v1[m]); }

/* GET users listing. */
router.route("/")
  .get(function(req, res) {
    res.json({name:"list users"});
  })
;

router.route("/:user_id")
  .get(function(req, res) {
    res.json({name:"one user: "+req.params.user_id});
  })
;

module.exports = router;