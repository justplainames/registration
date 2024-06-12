const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const FRONTEND_URL = process.env.FRONTEND_URL;
const { validateToken } = require("../middlewares/AuthMiddleware");
const { Users } = require("../models");
const BACKEND_API = process.env.BACKEND_API;

// Google's Oauth 2.0 is used to handle user management for authorisation and authentication of the app.
// When a user logins or signup,  using google's oauth, it would first hit this API endpoint
// It would first create an OAuth2Client with the redirectURL
// The redirectURL refers to the URL which the API endpoint to handle OAuth callbacks
// The Oauth2Client would also contain CLIENT_ID and CLIENT_SECRET (Client refers to the application )
// This endpoint injects a URL in the response that the user get redirect to.
// The URL is google webpage where the user logins to grants the client access to user information
router.post("/", async (req, res, next) => {
  res.header("Access-Control-Allow-Origin", FRONTEND_URL);
  res.header("Referrer-Policy", "no-referrer-when-downgrade");

  // backend
  const redirectUrl = `${BACKEND_API}oauth`;

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope:
      "https://www.googleapis.com/auth/userinfo.profile openid https://www.googleapis.com/auth/userinfo.email",
    prompt: "consent",
  });

  res.json({ url: authorizeUrl });
});

router.get("/authenticate", validateToken, async (req, res, next) => {
  try {
    if (req.sub) {
      res.json("ok");
    } else {
      res.json("Unauthenticated");
    }
  } catch (error) {
    console.log("Error in Request", error);
  }
});

router.get("/getRole", validateToken, async (req, res, next) => {
  await Users.findByPk(req.sub.new_uuid).then((data) => {
    res.json({
      role: data.dataValues.user_role,
      user_name: data.dataValues.user_name,
    });
  });
});

module.exports = router;
