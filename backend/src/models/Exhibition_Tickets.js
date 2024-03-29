const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Exhibition_Tickets', {
    id_Exhibition_Tickets: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Museum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Art_Exhibition',
        key: 'id_Art_Exhibition'
      }
    },
    Customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'id_Customer'
      }
    },
    Count: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    TotalPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Exhibition_Tickets',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Exhibition_Tickets" },
        ]
      },
    ]
  });
};
