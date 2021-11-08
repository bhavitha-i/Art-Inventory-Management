const Sequelize = require('sequelize');
const { Art_Styles } = require('../mysql');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Art_Styles', {
    id_Art_Styles: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    StyleName: {
      type: DataTypes.STRING(45),
      allowNull: false,
      unique: "StyleName_UNIQUE"
    },
    Description: {
      type: DataTypes.STRING(45),
      allowNull: true
    }
  }, {
    sequelize,
    tableName: 'Art_Styles',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id_Art_Styles" },
        ]
      },
      {
        name: "StyleName_UNIQUE",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "StyleName" },
        ]
      },
    ]
  },
  {
      classMethods:{
          associate:function(models){
              Art_Styles.hasMany(models.Artists );
          }
      }
  });
};
