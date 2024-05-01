const express = require("express");
const router = express.Router();
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");

const { OAuth2Client } = require("google-auth-library");
const axios = require("axios");
const { Users } = require("../models");

const { validateToken } = require("../middlewares/AuthMiddleware");
const jwt = require("jsonwebtoken");
const BACKEND_API = process.env.BACKEND_API;
const FRONTEND_URL = process.env.FRONTEND_URL;

dotenv.config();

async function getUserData(access_token) {
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  return response.data;
}
// router.use(cookieParser());

// This application uses Oauth2.0
// The event flow is as follows, the user clicks sign in on the application
// The user gets redirected to Google where they login and grants the application access to the google account
// It return the user from Google back to the browser together with an access token
//

// After the user log in to google to grant client access, it generates an authorization code that changes after every request
// The user then gets redirected to this API endpoint, the req is injected by Google with the authorization code
// This authorization code be retrieved by accessing req.query.code
// Another OAuth2Client gets generated with the CLIENT_ID and CLIENT_SECRET
// With the OAuth2Client, it makes a request to google's server with the authorization code
// It uses the authorization code to exchange it for a few tokens
// Access tokens that allow the client to call google api to retrieve user information
// Refresh tokens to allow the client to obtain a new access token
// ID Token provides information about the authenticated user such as UUID, name and email.
// The tokens get set in the client as an HTTPS only cookies to identify user
router.get("/", async function (req, res, next) {
  const code = req.query.code;
  let access_token;
  let sub;
  let id_token;
  try {
    // Create an OAuth2Client
    const REDIRECT_URI = `${BACKEND_API}oauth`;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      REDIRECT_URI
    );

    // Get Access Token via the authorization code
    const res = await oAuth2Client.getToken(code);

    // Sets the credentials of the oAuth2Client
    await oAuth2Client.setCredentials(res.tokens);

    // Performs user checks.
    const user = oAuth2Client.credentials;
    access_token = user.access_token;
    id_token = user.id_token;
    user_data = await getUserData(access_token);
    sub = user_data.sub;
  } catch (error) {
    console.error("Error with signing in With Google", error);
    res.status(500).json({ error: "Internal Server Error", message: error });
  }

  const found = await Users.findByPk(sub);
  res.cookie("access_token", access_token, {
    domain: "localhost:3000/",
    path: "/",
    httpOnly: true,
    secure: true, // Set the Secure attribute
    sameSite: "lax", // Set the SameSite attribute to None
  });
  res.cookie("id_token", id_token, {
    domain: `.localhost:3000`,
    path: "/",
    httpOnly: true,
    secure: true, // Set the Secure attribute
    sameSite: "lax", // Set the SameSite attribute to None
  });
  if (found) {
    // frontend
    res.redirect(`${FRONTEND_URL}/dashboard`);
  } else {
    const token = jwt.sign(
      { email: user_data.email, name: user_data.name },
      process.env.JWT_SECRET
    );
    // frontend
    res.redirect(`${FRONTEND_URL}/signup?token=${token}`);
  }
});

router.get("/logout", validateToken, async (req, res) => {
  res.clearCookie("access_token", "none", {
    httpOnly: true,
  });
  res.clearCookie("id_token", "none", {
    httpOnly: true,
  });
  res.json("Ok Logged Out!");
});

module.exports = router;
