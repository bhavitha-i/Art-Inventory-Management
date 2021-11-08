const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Purchase_Types', {
    id_Purchase_Types: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Types: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "Art from Store\\nArt Supplies from Store\\nArt from Auction\\n Ticket For Exhibition"
    }
  }, {
    sequelize,
    tableName: 'Purchase_Types',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Purchase_Types" },
        ]
      },
    ]
  });
};
