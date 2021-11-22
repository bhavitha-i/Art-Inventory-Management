const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_in_Auction', {
    id_Art_Auction: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    AtArtShow: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
    Price: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    StartBid: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Art_in_Auction',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Auction" },
        ]
      }
    ]
  });
};
