const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Order', {
    id_Order: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'id_Customer'
      }
    },
    Value: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    PaymentStatus: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Payment_Status',
        key: 'id_Payment_Status'
      }
    },
    Date: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Order',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Order" },
        ]
      },
      {
        name: "Order.CustomerId_idx",
        using: "BTREE",
        fields: [
          { name: "Customer" },
        ]
      },
      {
        name: "Order.PayemntStatus_idx",
        using: "BTREE",
        fields: [
          { name: "PaymentStatus" },
        ]
      },
    ]
  });
};
