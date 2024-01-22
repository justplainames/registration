const express = require("express");
const cors = require("cors");
const db = require("./models");
const homeRouter = require("./routes/Home");

const port = 3000;
const hostname = "0.0.0.0";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use("/home", homeRouter);

// Database connection and server start
db.sequelize
  .authenticate()
  .then(() => db.sequelize.sync())
  .then(() => {
    app.listen(port, hostname, () => {
      console.log("Server is running at http://" + hostname + ":" + port);
      console.log("Database connected successfully!");
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database:", error);
  });
