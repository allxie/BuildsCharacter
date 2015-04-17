"use strict";
module.exports = function(sequelize, DataTypes) {
  var Stat = sequelize.define("Stat", {
    CharacterId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    value: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        this.belongsTo(models.Character);
        // associations can be defined here
      }
    }
  });
  return Stat;
};