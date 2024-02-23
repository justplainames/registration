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
  console.log("\nACcess token is here ", access_token);
  const response = await axios.get(
    `https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}`
  );
  console.log("\nUsing the accessToken API", response.data);
  return response.data;
}
router.use(cookieParser());

// const REDIRECT_URI = process.env.REDIRECT_URI;

router.get("/logout", validateToken, async (req, res) => {
  console.log("Entered OAUTH LOGOUT");
  res.clearCookie("access_token", "none", {
    httpOnly: true,
  });
  res.clearCookie("id_token", "none", {
    httpOnly: true,
  });
  res.json("Ok Logged Out!");
});

router.get("/", async function (req, res, next) {
  console.log("\nEntered the OAuth Endpoint");
  const code = req.query.code;
  // console.log("Code = ", code);
  let access_token;
  let sub;
  let id_token;
  try {
    // backend
    const REDIRECT_URI = `${BACKEND_API}oauth`;
    const oAuth2Client = new OAuth2Client(
      process.env.CLIENT_ID,
      process.env.CLIENT_SECRET,
      REDIRECT_URI
    );

    // console.log("\nCreating the oAuth2Client in OAuth.endpoint");
    const res = await oAuth2Client.getToken(code);
    // console.log("\nCreating the Token in OAuth.endpoint");
    await oAuth2Client.setCredentials(res.tokens);
    // console.log(
    // "\nSetting the Creds for oAuth2Client in OAuth.endpoint",
    // oAuth2Client
    // );
    const user = oAuth2Client.credentials;
    // console.log("\nGetting the Creds for oAuth2Client in OAuth.endpoint");
    access_token = user.access_token;
    id_token = user.id_token;
    user_data = await getUserData(access_token);
    console.log("User = ", user);
    console.log("USer Data = ", user_data);

    sub = user_data.sub;

    // const found = awaitParticipant s.findOne({where: {
    //   participants_sub: sub
    // }})

    // if (found) {
    //   res.redirect
    // }
  } catch (err) {
    console.log("Error with signing in With Google", err);
    res.json(err);
  }

  const found = await Users.findByPk(sub);
  console.log("FOUND = ", found);
  res.cookie("access_token", access_token, {
    httpOnly: true,
    secure: true, // Set the Secure attribute
    sameSite: "none", // Set the SameSite attribute to None
  });
  res.cookie("id_token", id_token, {
    httpOnly: true,
    secure: true, // Set the Secure attribute
    sameSite: "none", // Set the SameSite attribute to None
  });
  if (found) {
    // frontend
    console.log("THE FRONTEND URL IS =", FRONTEND_URL);
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

module.exports = router;
