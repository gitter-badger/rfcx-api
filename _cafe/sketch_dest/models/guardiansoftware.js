(function() {
  var c;

  c = console.log;

  module.exports = function(sequelize, DataTypes) {
    var GuardianSoftware;
    return GuardianSoftware = sequelize.define('GuardianSoftware', {
      number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {}
      },
      release_date: {
        type: DataTypes.DATE,
        defaultValue: null,
        validate: {
          isDate: true
        }
      },
      is_available: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        validate: {
          isBoolean: true
        }
      },
      sha1_checksum: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {}
      }
    }, {
      classMethods: {
        associate: function(models) {}
      },
      tableName: 'GuardianSoftware'
    });
  };

}).call(this);
