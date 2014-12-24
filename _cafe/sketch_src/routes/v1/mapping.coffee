# mapping routes mapping

c= console.log
models= require('../../models')
express= require 'express'
router= express.Router()

router.route('/register')
  .post (req, res)->
    if (not(not(req.body.user)))
      reqMappingUser= JSON.parse req.body.user
      c 'req.body.user: ', req.body.user
      models.MappingUser
        .findOrCreate {where: {guid: reqMappingUser.guid, name: reqMappingUser.name}}
        .spread (dbMappingUser, wasCreated)->
          res.status(200).json
            guid: dbMappingUser.guid
            name: dbMappingUser.name
            lastCheckIn: dbMappingUser.last_check_in
            carrier: dbMappingUser.carrier
    else
      res.status(500).json {}

router.route('/checkin')
  .post (req, res)->
    res.json {name: 'one user: ' + req.params.user_id}

module.exports= router

