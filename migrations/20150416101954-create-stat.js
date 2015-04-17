"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Stats", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      CharacterId: {
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      value: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    }).done(done);
  },
  down: function(migration, DataTypes, done) {
    migration.dropTable("Stats").done(done);
  }
};