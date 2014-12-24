# guardiansoftware model guardiansoftware
c= console.log

module.exports= (sequelize, DataTypes)->
  GuardianSoftware= sequelize.define 'GuardianSoftware',
    number:
      type: DataTypes.STRING
      allowNull: false
      validate: {}
    release_date:
      type: DataTypes.DATE
      defaultValue: null
      validate:
        isDate: true
    is_available:
      type: DataTypes.BOOLEAN
      defaultValue: false
      validate:
        isBoolean: true
    sha1_checksum:
      type: DataTypes.STRING
      allowNull: true
      validate: {}
  ,
    classMethods:
      associate: (models)->
        # associations can be defined here
    tableName: 'GuardianSoftware'

  #return GuardianSoftware # implicit