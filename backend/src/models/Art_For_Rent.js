const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_For_Rent', {
    idArt_For_Rent: {
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
    Customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Customer',
        key: 'id_Customer'
      }
    },
    FromStore: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Store',
        key: 'id_Store'
      }
    },
    StartDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    EndDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    TotalRentValue: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Art_For_Rent',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idArt_For_Rent" },
        ]
      },
      {
        name: "Art_For_Rent.ArtId_idx",
        using: "BTREE",
        fields: [
          { name: "Art" },
        ]
      },
      {
        name: "Art_For_Rent.StoreId_idx",
        using: "BTREE",
        fields: [
          { name: "FromStore" },
        ]
      },
      {
        name: "Art_For_Rent.CustomerId_idx",
        using: "BTREE",
        fields: [
          { name: "Customer" },
        ]
      },
    ]
  });
};
