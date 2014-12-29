# init file : initialise alpha build unit tests

global.uid= require 'node-uuid'
global._= require 'lodash'
global.c= console.log

chai= require 'chai'
chaiAsPromised= require 'chai-as-promised'
chai.use chaiAsPromised
chai.config.includeStack= true
global.should= chai.should()
global.expect= chai.expect
global.AssertionError= chai.AssertionError
global.Assertion= chai.Assertion
global.assert= chai.assert

c "init here"
app= require('../../app')
models= require('../../models')
#require('../../bin/start.js')
server= app.listen app.get('port'), ->
  c app.get('title') + " (port " + app.get('port') + ") ("+process.env.NODE_ENV + ")"
#app= require('../../_cafe/sketch_src/app')
#index= require('../../_cafe/sketch_src/models/index')

# how injection is handled in britvic, one reason i was thinking to change 
# the module exports thing a bit in rfcx-api .

#global.relationMi= ss.api.britvic.models.relation_iced 
#global.Relation= require('../../server/models/relation_iced').Relation