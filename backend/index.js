const express = require("express");
const cors = require("cors");
const db = require("./models");
const dotenv = require("dotenv");

dotenv.config();

const port = 3000;
const hostname = "0.0.0.0";

const app = express();

// Middleware
app.use(express.json());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      `${process.env.FRONTEND_URL}`,
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});
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
const landingPageRouter = require("./routes/LandingPage");
app.use("/", landingPageRouter);
const dashboardRouter = require("./routes/Dashboard");
app.use("/dashboard", dashboardRouter);
const createEventRouter = require("./routes/CreateEvent");
app.use("/createEvent", createEventRouter);
const addParticipantRouter = require("./routes/AddParticipant");
app.use("/addParticipant", addParticipantRouter);
const scoreRouter = require("./routes/Scoring");
app.use("/score", scoreRouter);
const bracketRouter = require("./routes/Brackets");
app.use("/bracket", bracketRouter);
const authRouter = require("./routes/Oauth");
app.use("/oauth", authRouter);
const requestRouter = require("./routes/Requests");
app.use("/request", requestRouter);
const signupRouter = require("./routes/Signup");
app.use("/signup", signupRouter);

app.use((err, req, res, next) => {
  console.error("The error is ", err); // Log the error for debugging purposes

  // Handle different types of errors
  if (err.name === "UnauthorizedError") {
    // Handle unauthorized errors (e.g., invalid token)
    // res.status(401).json({ error: "Unauthorized" });
    console.log("REACHED AN ERROR");
    res.status(401).json({ error: "Unauthorized" });
  } else {
    // Handle other types of errors
    res.status(500).json({ error: "Internal Server Error" });
  }
});

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
