const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_in_Exhibition', {
    id_Art_in_Exhibition: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    Exhibition: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art_Exhibition',
        key: 'id_Art_Exhibition'
      }
    },
    Art: {
      type: DataTypes.INTEGER,
      allowNull: true,
      references: {
        model: 'Art',
        key: 'id_Art'
      }
    }
  }, {
    sequelize,
    tableName: 'Art_in_Exhibition',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_in_Exhibition" },
        ]
      },
      {
        name: "ExhibitionId_idx",
        using: "BTREE",
        fields: [
          { name: "Exhibition" },
        ]
      },
      {
        name: "Art_in_Exhibition.ArtId_idx",
        using: "BTREE",
        fields: [
          { name: "Art" },
        ]
      },
    ]
  });
};
