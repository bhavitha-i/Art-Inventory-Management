const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Address', {
    id_Address: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Street1: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Street2: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    ZipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'ZipCode_in_States',
        key: 'ZipCode'
      }
    }
  }, {
    sequelize,
    tableName: 'Address',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Address" },
        ]
      },
      {
        name: "ZipCode_id_idx",
        using: "BTREE",
        fields: [
          { name: "ZipCode" },
        ]
      },
    ]
  });
};
