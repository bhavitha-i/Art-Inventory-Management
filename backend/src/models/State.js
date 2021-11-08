const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('State', {
    id_State: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Name_UNIQUE"
    },
    Country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Country',
        key: 'id_Country'
      }
    }
  }, {
    sequelize,
    tableName: 'State',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_State" },
          { name: "Country_id" },
        ]
      },
      {
        name: "Name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Name" },
        ]
      },
      {
        name: "Country_id_idx",
        using: "BTREE",
        fields: [
          { name: "Country_id" },
        ]
      },
    ]
  });
};
