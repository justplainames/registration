"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];
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
db.Categories.belongsToMany(db.Events, {
  through: "EventCategories",
  foreignKey: "category_id_fk",
});
db.Events.belongsToMany(db.Categories, {
  through: "EventCategories",
  foreignKey: "event_id_fk",
});

db.Judges.belongsToMany(db.Categories, {
  through: "JudgesCategories",
  foreignKey: "judge_id_fk",
});
db.Categories.belongsToMany(db.Judges, {
  through: "JudgesCategories",
  foreignKey: "category_id_fk",
});

// db.JudgesCategories.belongsTo(db.Events, {
//   foreignKey: "events_id_fk",
// });

db.Scores.belongsTo(db.Participants, { foreignKey: "participant_id_fk" });
db.Scores.belongsTo(db.Judges, { foreignKey: "judge_id_fk" });
db.Scores.belongsTo(db.Categories, { foreignKey: "category_id_fk" });
db.Scores.belongsTo(db.Events, { foreignKey: "event_id_fk" });

db.ParticipantsCategories.belongsTo(db.Participants, {
  foreignKey: "participant_id_fk",
});
db.ParticipantsCategories.belongsTo(db.Categories, {
  foreignKey: "category_id_fk",
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
