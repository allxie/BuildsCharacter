"use strict";
module.exports = function(sequelize, DataTypes) {
  var Character = sequelize.define("Character", {
    name: DataTypes.STRING,
    gender: DataTypes.STRING,
    background: DataTypes.TEXT,
    race: DataTypes.STRING
  }, {
    instanceMethods: {
      //adds stats to characters
      addStat: function(db, name, value) {
        return db.Stat
               .create({name:name,
                value:value,
                CharacterId: this.id});    
      }
    },
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        this.hasMany(models.Stat);
        this.belongsTo(models.User);
      }
    }
  });
  return Character;
};