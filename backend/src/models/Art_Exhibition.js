const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_Exhibition', {
    id_Art_Exhibition: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Museum: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Museum',
        key: 'id_Museum'
      }
    },
    Title: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Date: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    TicketPrice: {
      type: DataTypes.DECIMAL(10,2),
      allowNull: true
    },
    StartTime: {
      type: DataTypes.DATE,
      allowNull: true
    },
    EndTime: {
      type: DataTypes.DATE,
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Art_Exhibition',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Exhibition" },
        ]
      }
    ]
  });
};
