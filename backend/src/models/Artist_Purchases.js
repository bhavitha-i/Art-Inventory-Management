const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Artist_Purchases', {
    idArtist_Purchases: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Order: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Order',
        key: 'id_Order'
      }
    },
    ArtSupplies: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art_Supplies',
        key: 'id_Art_Supplies'
      }
    },
    Quantity: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    Artist: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Artist',
        key: 'id_Artist'
      }
    }
  }, {
    sequelize,
    tableName: 'Artist_Purchases',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "idArtist_Purchases" },
        ]
      }
    ]
  });
};
