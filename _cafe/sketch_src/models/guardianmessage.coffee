# model guardianmessage model
c= console.log

module.exports= (sequelize, DataTypes)->
  GuardianMessage= sequelize.define 'GuardianMessage',
    guid:
      type: DataTypes.UUID
      defaultValue: DataTypes.UUIDV4
    received_at:
      type: DataTypes.NOW
      validate:
        isDate: true
    origin:
      type: DataTypes.STRING
      allowNull: true
      validate: {}
    body:
      type: DataTypes.STRING
      allowNull: true
      validate: {}
  ,
    classMethods:
      associate: (models)->
        # associations can be defined here

  # return GuardianMessage # implicit return should work