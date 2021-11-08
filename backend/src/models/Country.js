const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Country', {
    id_Country: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Name_UNIQUE"
    }
  }, {
    sequelize,
    tableName: 'Country',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Country" },
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
    ]
  });
};
