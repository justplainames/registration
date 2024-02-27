"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
require("dotenv").config();
const config = {
  username: process.env.DEVELOPMENT_USERNAME,
  password: process.env.DEVELOPMENT_PASSWORD,
  database: process.env.DEVELOPMENT_DATABASE,
  host: process.env.DEVELOPMENT_HOST,
  dialect: process.env.DEVELOPMENT_DIALECT,
};

const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
  );
}

fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Create the association for the junction table
// n:n between categories and events
db.Categories.belongsToMany(db.Events, {
  through: "EventCategories",
  foreignKey: "category_id_fk",
});
db.Events.belongsToMany(db.Categories, {
  through: "EventCategories",
  foreignKey: "event_id_fk",
});

// n:n between judges and categories
db.Judges.belongsToMany(db.Categories, {
  through: "JudgesCategories",
  foreignKey: "judge_id_fk",
});
db.Categories.belongsToMany(db.Judges, {
  through: "JudgesCategories",
  foreignKey: "category_id_fk",
});

// 1:n
db.UsersCategories.belongsTo(db.Users, {
  foreignKey: "user_id_fk",
});
db.UsersCategories.belongsTo(db.Categories, {
  foreignKey: "category_id_fk",
});
db.UsersCategories.belongsTo(db.Events, {
  foreignKey: "event_id_fk",
});

db.Users.hasMany(db.UsersCategories, { foreignKey: "user_id_fk" });

// 1:n relationship between scores and the 4 models.
db.Scores.belongsTo(db.Users, { foreignKey: "user_id_fk" });
db.Scores.belongsTo(db.Judges, { foreignKey: "judge_id_fk" });
db.Scores.belongsTo(db.Categories, { foreignKey: "category_id_fk" });
db.Scores.belongsTo(db.Events, { foreignKey: "event_id_fk" });

db.sequelize = sequelize;

module.exports = db;
