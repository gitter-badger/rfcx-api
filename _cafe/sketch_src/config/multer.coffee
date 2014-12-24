# config multer config
c= console.log

exports.config= (processEnv)->
  return dest: processEnv.UPLOAD_CACHE_DIRECTORY