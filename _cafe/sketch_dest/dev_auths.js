(function() {
  module.rfcx_api_configs = function(apiM) {
    return apiM.devv_group = {};
  };

  module.exports = function() {
    var devv_group;
    return devv_group = {
      topher: {
        username: 'topher',
        token: '',
        password: 'deprecate in favor of hashed salted',
        hash: 'santoeu'
      },
      kevin: {},
      paul: {},
      michelle: {},
      stefan: {},
      wylie: {}
    };
  };

}).call(this);
