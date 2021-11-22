const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_In_Museum', {
    id_Art_In_Museum: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Art: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art',
        key: 'id_Art'
      }
    },
    Musem: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Museum',
        key: 'id_Museum'
      }
    }
  }, {
    sequelize,
    tableName: 'Art_In_Museum',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_In_Museum" },
        ]
      }
    ]
  });
};
