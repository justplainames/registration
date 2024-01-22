const port = 3000;
const hostname = "0.0.0.0";
const cors = require("cors");

console.log(port, hostname);

const express = require("express");
const db = require("./models");

const app = express();
app.use(express.json());
app.use(cors());

const homeRouter = require("./routes/Home");
app.use("/home", homeRouter);

db.sequelize
  .authenticate()
  .then(() => {
    return db.sequelize.sync();
  })
  .then(() => {
    app.listen(port, hostname, () => {
      console.log("Database connected successfully!");
    });
  });
