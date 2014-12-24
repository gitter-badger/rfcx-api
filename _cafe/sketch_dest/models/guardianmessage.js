(function() {
  var c;

  c = console.log;

  module.exports = function(sequelize, DataTypes) {
    var GuardianMessage;
    return GuardianMessage = sequelize.define('GuardianMessage', {
      guid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      received_at: {
        type: DataTypes.NOW,
        validate: {
          isDate: true
        }
      },
      origin: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {}
      },
      body: {
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
