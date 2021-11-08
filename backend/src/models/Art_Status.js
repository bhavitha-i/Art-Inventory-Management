const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_Status', {
    id_Art_Status: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Status: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "Not Moved\nIn Store\nIn shows\nIn Museum\nSold in Store\nRented out in Store\nIn Auction\nIn Exhibition"
    }
  }, {
    sequelize,
    tableName: 'Art_Status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Status" },
        ]
      },
    ]
  });
};
