"use strict";
module.exports = {
  up: function(migration, DataTypes, done) {
    migration.createTable("Characters", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      name: {
        type: DataTypes.STRING
      },
      gender: {
        type: DataTypes.STRING
      },
      background: {
        type: DataTypes.TEXT
      },
      race: {
        type: DataTypes.STRING
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
    migration.dropTable("Characters").done(done);
  }
};