
# can refactor to make the dependency passing on a common object
# like with our socketstream builds to get rid of this
# brittle relative location dependency management.

models= require('../../models')
express= require 'express'
router= require express.Router()

router.route '/'
  .get (req, res)->
    res.json name: "list guardians"
  .post (req, res)->

router.route '/:guardian_id'
  .get (req, res)->
    res.json name: "one guardian: " + req.params.guardian_id

module.exports= router