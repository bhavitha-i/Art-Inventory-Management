const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_Supplies', {
    id_Art_Supplies: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Quantity: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    Price: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    AtStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id_Store'
      }
    }
  }, {
    sequelize,
    tableName: 'Art_Supplies',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Supplies" },
        ]
      },
      {
        name: "Art_Supplies.StoreId_idx",
        using: "BTREE",
        fields: [
          { name: "AtStore" },
        ]
      },
    ]
  });
};
