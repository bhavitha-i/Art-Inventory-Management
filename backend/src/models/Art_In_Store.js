const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_In_Store', {
    id_Art_In_Store: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Art: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Art',
        key: 'id_Art'
      }
    },
    Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: false
    },

    RentPerDay: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    AtStore: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Store',
        key: 'id_Store'
      }
    },
  }, {
    sequelize,
    tableName: 'Art_In_Store',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_In_Store" },
        ]
      }
    ]
  });
};
