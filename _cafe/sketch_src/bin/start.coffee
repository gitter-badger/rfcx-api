#!/usr/bin/env node
c= console.log
debug= require('debug')('rfcx-api')
app= require('../app')
models = require("../models")

models.sequelize.sync().then ->

  models.sequelize.getMigrator
    path: process.cwd()+'/migrations'
    # ,filesFilter: /\.coffee$/*/
    .migrate({ method: 'up'}).success ->

      server= app.listen app.get('port'), ->
        c(app.get("title")+" (port "+app.get('port')+") ("+process.env.NODE_ENV+")")

