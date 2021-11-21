const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_Show', {
    id_Art_Show: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Host: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Location: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Address',
        key: 'id_Address'
      }
    },
    ShowURL: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Art_Show',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Show" },
        ]
      }
    ]
  });
};
