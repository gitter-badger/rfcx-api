(function() {
  var chai, chaiAsPromised, models, server;

  global.uid = require('node-uuid');

  global._ = require('lodash');

  global.c = console.log;

  chai = require('chai');

  chaiAsPromised = require('chai-as-promised');

  chai.use(chaiAsPromised);

  chai.config.includeStack = true;

  global.request = require('supertest');

  global.nock = require('nock');

  global.should = chai.should();

  global.expect = chai.expect;

  global.AssertionError = chai.AssertionError;

  global.Assertion = chai.Assertion;

  global.assert = chai.assert;

  c("init here");

  global.app = require('../../app');

  models = require('../../models');

  server = app.listen(app.get('port'), function() {
    return c(app.get('title') + " (port " + app.get('port') + ") (" + process.env.NODE_ENV + ")");
  });

}).call(this);
