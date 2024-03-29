'use strict'
require('dotenv').config();

const Sequelize = require('sequelize'); 
const sequelize = new Sequelize(process.env.DATABASE_NAME, process.env.DATABASE_USERNAME, process.env.DATABASE_PASSWORD, {
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  dialect: process.env.DATABASE_DIALECT
});



// Connect all the models/tables in the database to a db object, 
//so everything is accessible via one object
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// initialize()
var initModels = require("./models/init-models");
db.models = initModels(sequelize);



async function initialize() {
  await sequelize.sync();
}

module.exports = db;
