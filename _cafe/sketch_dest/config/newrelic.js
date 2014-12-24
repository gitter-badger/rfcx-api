(function() {
  var c;

  c = console.log;

  exports.config = {
    app_name: ['api.rfcx.org'],
    licence_key: process.env.NEW_RELIC_KEY,
    logging: {
      level: 'trace'
    }
  };

}).call(this);
