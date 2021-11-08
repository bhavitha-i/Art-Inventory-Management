const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('InStore_Art_Status', {
    id_InStore_Art_Status: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "Available\nOut on Rent\nSold"
    }
  }, {
    sequelize,
    tableName: 'InStore_Art_Status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_InStore_Art_Status" },
        ]
      },
    ]
  });
};
