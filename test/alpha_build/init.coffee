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