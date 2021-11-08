const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Sculpture_Art', {
    id_Sculpture_Art: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    ArtId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Art',
        key: 'id_Art'
      }
    },
    Height: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Weight: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Material: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Style: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Texture: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Sculpture_Art',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Sculpture_Art" },
        ]
      },
      {
        name: "Sculpture_Art.ArtId_idx",
        using: "BTREE",
        fields: [
          { name: "ArtId" },
        ]
      },
    ]
  });
};
