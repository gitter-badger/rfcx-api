(function() {
  var c;

  c = console.log;

  module.exports = function(sequelize, DataTypes) {
    var Guardian;
    return Guardian = sequelize.define('Guardian', {
      guid: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {}
      },
      shortname: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
        validate: {}
      },
      last_check_in: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
        validate: {
          isDate: true
        }
      },
      latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: -90,
          max: 90
        }
      },
      longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
        validate: {
          isFloat: true,
          min: -180,
          max: 180
        }
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {}
      }
    }, {
      classMethods: {
        associate: function(models) {}
      }
    });
  };

}).call(this);
