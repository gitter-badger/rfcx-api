
# check for environmental variable file and load if present
fs= require 'fs'
if (fs.existsSync("./config/env_vars.js"))
  env= require("./config/env_vars.js").env
  for i in env
    process.env[i]= env[i]

# New Relic Initialization
if (process.env.NODE_ENV is 'production')
  process.env.NEW_RELIC_HOME= __dirname + '/config'
  require 'newrelic'

express= require 'express'
path= require 'path'
bodyParser= require 'body-parser'
favicon= require 'serve-favicon'
logger= require 'morgan'
multer= require 'multer'
passport= require 'passport'

require('./config/passport')(passport)
middleware= {}
app= express()

app.set("title", "Rainforest Connection API")
app.set("port", process.env.PORT or 8000)
app.use(favicon(__dirname + "/public/img/logo/favicon.ico"))
app.use(logger("dev"))
app.use(multer(require('./config/multer').config(process.env)))
app.use(express.static(path.join(__dirname, 'public')))
app.use(passport.initialize())

# Define and load routes
routes=
  "v1":
    "users": require('./routes/v1/users')
    "mapping": require('./routes/v1/mapping')
    "guardians": require('./routes/v1/guardians')
    "checkins": require('./routes/v1/checkins')
  "v2": {}

# Initialise version specific middleware
for apiVersion in routes
  middleware[apiVersion]= require('./middleware/' + apiVersion + '.js').middleware
  for middlewareFunc in middleware[apiVersion]
    app.use("/" + apiVersion + "/", middleware[apiVersion][middleWareFunc])

# Initialize routes
for apiVersion in routes
  for routeName in routes[apiVersion]
    app.use('/' + apiVersion + '/' + routeName, routes[apiVersion][routeName])

# Health check endpoint
app.get "/health_check", (req, res)->
  res.status(200).json({rfcx: "awesome"})

app.use (req, res, next)->
  err= new Error 'Not Found'
  err.status= 404
  next(err)

if (app.get('env') is 'development')
  app.use (err, req, res, next)->
    res.status(err.status or 500).json({message: err.message, error: err})

app.use (err, req, res, next)->
  res.status(err.status or 500).json
    message: err.message
    error: {}

module.exports= app

