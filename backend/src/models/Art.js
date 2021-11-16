const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art', {
    id_Art: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Title: {
      type: DataTypes.STRING(45),
      allowNull: true,
      unique: "Title_UNIQUE"
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    Year: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    CountryOfOrigin: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Country',
        key: 'id_Country'
      }
    },
    CreatedBy: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Artist',
        key: 'id_Artist'
      }
    },
    Status: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Art availability status is based on where the art is available.\nMovingStatus = 0 ; Not moved anywhere yet\nMovingStatus = 1; Moved to Store\nMovingStatus = 2 ; Moved to Museum\nMovingStatus = 3; Moved to Art Shows",
      references: {
        model: 'Art_Status',
        key: 'id_Art_Status'
      }
    },
    Style: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art_Styles',
        key: 'id_Art_Styles'
      }
    },
    Image: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Art',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art" },
        ]
      },
      {
        name: "Title_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Title" },
        ]
      },
      {
        name: "CountryId_idx",
        using: "BTREE",
        fields: [
          { name: "CountryOfOrigin" },
        ]
      },
      {
        name: "ArtistId_idx",
        using: "BTREE",
        fields: [
          { name: "CreatedBy" },
        ]
      },
      {
        name: "StyleId_idx",
        using: "BTREE",
        fields: [
          { name: "Style" },
        ]
      },
      {
        name: "StatusId_idx",
        using: "BTREE",
        fields: [
          { name: "Status" },
        ]
      },
    ]
  });
};
