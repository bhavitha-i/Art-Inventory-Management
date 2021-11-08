const Sequelize = require('sequelize');
const { Artist } = require('../mysql');

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Artist', {
    id_Artist: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Name: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "Name_UNIQUE"
    },
    Phone: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    DateOfBirth: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    FamousStyle: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art_Styles',
        key: 'id_Art_Styles'
      }
    },
    WebsiteURL: {
      type: DataTypes.STRING(45),
      allowNull: true
    },
    BirthPlace: {
      type: DataTypes.INTEGER,
      allowNull: true,
      comment: "Refers to Country table",
      references: {
        model: 'Country',
        key: 'id_Country'
      }
    }
  }, {
    sequelize,
    tableName: 'Artist',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Artist" },
        ]
      },
      {
        name: "Name_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "Name" },
        ]
      },
      {
        name: "CountryId_idx",
        using: "BTREE",
        fields: [
          { name: "BirthPlace" },
        ]
      },
      {
        name: "StyleId_idx",
        using: "BTREE",
        fields: [
          { name: "FamousStyle" },
        ]
      },
    ]
  });

};
