# users routes users

c= console.log
models= require('../../models')
express= require 'express'
router= express.Router()

router.route('/')
  .get (req, res)->
    res.json name: 'list users'

router.route('/:user_id')
  .get (req, res)->
    res.json name: 'one user: ' + req.params.user_id

module.exports= router

# .......
