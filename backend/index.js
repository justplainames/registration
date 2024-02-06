const express = require("express");
const cors = require("cors");
const db = require("./models");

const port = 3000;
const hostname = "0.0.0.0";

const app = express();

// Middleware
app.use(express.json());
app.use(cors());
// app.use((req, res, next) => {
//   res.header(
//     "Access-Control-Allow-Origin",
//     "https://coruscating-cranachan-dee807.netlify.app"
//   );
//   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
//   res.header("Access-Control-Allow-Headers", "Content-Type");

//   // Handle preflight OPTIONS request
//   if (req.method === "OPTIONS") {
//     return res.status(200).end();
//   }

//   next();
// });
// Routes
const homeRouter = require("./routes/Home");
app.use("/", homeRouter);
const createEventRouter = require("./routes/CreateEvent");
app.use("/createEvent", createEventRouter);
const addParticipantRouter = require("./routes/AddParticipant");
app.use("/addParticipant", addParticipantRouter);
const scoreRouter = require("./routes/Scoring");
app.use("/score", scoreRouter);

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
