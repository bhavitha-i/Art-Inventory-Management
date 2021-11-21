const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer', {
    id_Customer: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    FirstName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    LastName: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Address: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'id_Address'
      }
    },
    Email: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    isPremium: {
      type: DataTypes.TINYINT,
      allowNull: false,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'Customer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Customer" },
        ]
      }
    ]
  });
};
