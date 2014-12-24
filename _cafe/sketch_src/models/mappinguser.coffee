# model mappinguser
c= console.log

module.exports= (sequelize, DataTypes)->
  MappingUser= sequelize.define 'MappingUser', 
    guid:
      type: DataTypes.STRING
      allowNull: false
      unique: false
      validate: {}
    name:
      type: DataTypes.STRING
      allowNull: false
      unique: false
      validate: {}
    email:
      type: DataTypes.STRING
      allowNull: true
      validate: {}
    last_check_in:
      type: DataTypes.DATE
      defaultValue: DataTypes.NOW
      validate:
        isDate: true
    carrier:
      type: DataTypes.STRING
      allowNull: true
      unique: true
      validate: {}
  ,
    classMethods:
      associate: (models)->
        # associations can be defined here

  # return MappingUser # implicit returns in coffee-script
