# setup 
c= console.log
exec= require('child_process').exec
fs= require 'fs'

if (fs.existsSync(__dirname + "/../config/env_vars.js"))
  env= require(__dirname+"/../config/env_vars.js")
  for i in env
    process.env[i]= env[i]

generateSequelizeConfigJson= ->
  configJsonFile= __dirname+"/../config/config.json"

  configCustom= configCustom = '"username": "'+process.env.RDS_USERNAME+'", "password": "'+process.env.RDS_PASSWORD+'", "database": "'+process.env.RDS_DB_NAME+'", "host": "'+process.env.RDS_HOSTNAME+'"'

  configGeneric = '"dialect": "mysql", "logging": 
    '+(process.env.SEQUELIZE_VERBOSE or false)+', "define": { "underscored": true, "charset": "utf8", "collate": 
    "utf8_general_ci", "timestamps": true }'

  configJsonContent = '{ '+'\n"development": { '+configCustom+', '+configGeneric+' }, 
    \n"test": { '+configCustom+', '+configGeneric+' }, ' +'\n"staging": { '+configCustom+', '+configGeneric+' },
    \n"production": { '+configCustom+', '+configGeneric+' } 
    \n}'

  fs.unlink configJsonFile, (e)->
      fs.writeFile configJsonFile, configJsonContent, (e)->
      if (!e)
        exec "echo 'sequelize config.json has been [re]generated.'; ", (err,stdout,stderr)->
          c stdout

purgeFilesInUploadCacheDirectory= ->
  try
    if (fs.existsSync(process.env.UPLOAD_CACHE_DIRECTORY))
      fs.readdir process.env.UPLOAD_CACHE_DIRECTORY, (err, uploads)->
        uploads.forEach (uploadFileName)->
          fs.unlink process.env.UPLOAD_CACHE_DIRECTORY+uploadFileName, (err)->
            if (err) then throw err
  catch err
    console.error(err)






generateSequelizeConfigJson()
purgeFilesInUploadCacheDirectory()
