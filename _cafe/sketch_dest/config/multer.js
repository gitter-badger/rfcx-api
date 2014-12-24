(function() {
  var c;

  c = console.log;

  exports.config = function(processEnv) {
    return {
      dest: processEnv.UPLOAD_CACHE_DIRECTORY
    };
  };

}).call(this);
