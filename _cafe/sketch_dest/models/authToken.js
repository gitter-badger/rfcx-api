(function() {
  var c;

  c = console.log;

  module.exports = function(sequelize, DataTypes) {
    var AuthToken;
    return AuthToken = sequelize.define('AuthToken', {
      type: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: false,
        validate: {}
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {}
      }
    }, {
      classMethods: {
        associate: function(models) {
          return AuthToken.belongsTo(models.User);
        }
      }
    });
  };

}).call(this);
