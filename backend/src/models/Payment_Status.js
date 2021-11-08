const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Payment_Status', {
    id_Payment_Status: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Status: {
      type: DataTypes.STRING(45),
      allowNull: false,
      comment: "0 ; Initiated\n1 ; Completed\n2 ; Pending\n3 ; Rejected"
    }
  }, {
    sequelize,
    tableName: 'Payment_Status',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Payment_Status" },
        ]
      },
    ]
  });
};
