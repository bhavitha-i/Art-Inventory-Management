const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_bids', {
    id_Art_Bids: {
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
    ArtShow: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art_Show',
        key: 'id_Art_Show'
      }
    },
    Art: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art',
        key: 'id_Art'
      }
    },
    BidValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Status = 0 ; Pending\nstatus = 1 ; Rejected\nstatus = 2 ; Accepted"
    }
  }, {
    sequelize,
    tableName: 'Art_bids',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Bids" },
        ]
      },
      {
        name: "Bids.Customer_idx",
        using: "BTREE",
        fields: [
          { name: "Customer" },
        ]
      },
      {
        name: "Bids.Art_idx",
        using: "BTREE",
        fields: [
          { name: "Art" },
        ]
      },
      {
        name: "Bids.ShowsId_idx",
        using: "BTREE",
        fields: [
          { name: "ArtShow" },
        ]
      },
    ]
  });
};
