const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Painting_Art', {
    id_Painting_Art: {
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
    Style: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    'Drawn on': {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Type: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Length: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Width: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Painting_Art',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Painting_Art" },
        ]
      },
      {
        name: "Painting_Art.ArtId_idx",
        using: "BTREE",
        fields: [
          { name: "Art" },
        ]
      },
    ]
  });
};
