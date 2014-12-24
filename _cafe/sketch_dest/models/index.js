(function() {
  var Sequelize, c, config, db, env, fs, path, sequelize,
    __indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  c = console.log;

  fs = require('fs');

  path = require('path');

  Sequelize = require('sequelize');

  env = process.env.NODE_ENV || 'development';

  config = require(__dirname + '/../config/config.json')[env];

  sequelize = new Sequelize(config.database, config.username, config.password, config);

  db = {};

  fs.readdirSync(__dirname).filter(function(file) {
    return (file.indexOf(".") !== 0) && (file !== "index.js") && (file !== "_associations.js");
  }).forEach(function(file) {
    var model;
    model = sequelize['import'](path.join(__dirname, file));
    return db[model.name] = model;
  });

  Object.keys(db).forEach(function(modelName) {
    if ((__indexOf.call(db[modelName], "associate") >= 0)) {
      return db[modelName].associate(db);
    }
  });

  db.sequelize = sequelize;

  db.Sequelize = Sequelize;

  module.exports = db;

}).call(this);
