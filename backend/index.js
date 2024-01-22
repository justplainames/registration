// const express = require("express");
// const app = express();

const port = 3000;
const hostname = "0.0.0.0";

// app.get("/", (req, res) => {
//   res.send("Hello!");
// });

// app.listen(port, hostname, () => {
//   console.log(`Server running on port ${port}`);
// });

console.log(port, hostname);

const express = require("express");
const db = require("./models");
const { Values } = require("./models");

const app = express();

app.get("/", (req, res) => {
  Values.create({
    counts: 5,
  }).then((value) => {
    res.json(value);
  });
});

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
