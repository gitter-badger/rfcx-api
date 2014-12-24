# model authtoken model
c= console.log

module.exports= (sequelize, DataTypes)->
  AuthToken= sequelize.define 'AuthToken',
    type:
      type: DataTypes.STRING
      allowNull: false
      unique: false
      validate: {}
    token:
      type: DataTypes.STRING
      allowNull: false
      unique: true
      validate: {}
  ,
    classMethods:
      associate: (models)->
        AuthToken.belongsTo models.User

  #return AuthToken # implicit return here