const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('ZipCode_in_States', {
    ZipCode: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StateId: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'State',
        key: 'id_State'
      }
    },
    CityName: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'ZipCode_in_States',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "ZipCode" },
        ]
      }
    ]
  });
};
