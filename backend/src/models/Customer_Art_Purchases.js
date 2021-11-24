const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Customer_Art_Purchases', {
    id_Customer_Purchases: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Customer: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Customer',
        key: 'id_Customer'
      }
    },
    Order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'id_Order'
      }
    },
    Type: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Purchase_Types',
        key: 'id_Purchase_Types'
      }
    },
    Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Purchase_Ref_Id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: "Art Id\nArt Supplies Id\nExhibition Ticket id",
      references: {
        model: 'Art',
        key: 'id_Art'
      }
    }
  }, {
    sequelize,
    tableName: 'Customer_Art_Purchases',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Customer_Purchases" },
        ]
      },
      {
        name: "Customer_Purchases.Customer_idx",
        using: "BTREE",
        fields: [
          { name: "Customer" },
        ]
      },
      {
        name: "Customer_Purchases.OrderId_idx",
        using: "BTREE",
        fields: [
          { name: "Order" },
        ]
      },
      {
        name: "Customer_Purchases.Type_idx",
        using: "BTREE",
        fields: [
          { name: "Type" },
        ]
      },
      {
        name: "Purchase_Ref_Id",
        using: "BTREE",
        fields: [
          { name: "Purchase_Ref_Id" },
        ]
      },
    ]
  });
};
