const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const FRONTEND_URL = process.env.FRONTEND_URL;
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Users } = require("../models");
const apiPath = process.env.REACT_APP_API_PATH;
const BACKEND_API = process.env.BACKEND_API;

router.post("/", async (req, res, next) => {
  console.log("Origin:", req.headers.origin);
  console.log("\nEntered the Requests.endpoint");
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  // backend
  const redirectUrl = `${BACKEND_API}oauth`;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );
  console.log("\nCreating the oAuth2Client in requests.endpoint", oAuth2Client);

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
    prompt: "consent",
  });

  console.log(
    "\nIn the Requests creating Created the Authorize URL in requests.endpoint:",
    authorizeUrl
  );
  console.log("TESTING");
  res.json({ url: authorizeUrl });
});

router.get("/authenticate", validateToken, async (req, res, next) => {
  if (req.sub) {
    res.json("ok");
  } else {
    res.json("Unauthenticated");
  }
});

router.get("/getRole", validateToken, async (req, res, next) => {
  await Users.findByPk(req.sub.new_uuid).then((data) => {
    res.json(data.dataValues.user_role);
  });
});

module.exports = router;
