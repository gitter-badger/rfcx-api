# config newrelic config
c= console.log

# New Relic agent configuration.
# See lib/config.defaults.js in the agent distribution for a more complete
# description of configuration variables and their potential values.

exports.config=
  app_name: ['api.rfcx.org']
  # New Relic agent configuration.
  licence_key: process.env.NEW_RELIC_KEY
  logging:
    level: 'trace'
