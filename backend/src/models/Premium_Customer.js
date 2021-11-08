const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Premium_Customer', {
    id_Customer: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Customer',
        key: 'id_Customer'
      }
    },
    ExpiresOn: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    Membership: {
      type: DataTypes.STRING(45),
      allowNull: true,
      comment: "Membership can be Gold, Silver, platinum types\n"
    }
  }, {
    sequelize,
    tableName: 'Premium_Customer',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Customer" },
        ]
      },
    ]
  });
};
