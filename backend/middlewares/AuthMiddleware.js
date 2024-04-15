const { OAuth2Client } = require("google-auth-library");
const dotenv = require("dotenv");
dotenv.config();
const client = new OAuth2Client(process.env.CLIENT_ID);
const { auth } = require("express-oauth2-jwt-bearer");

const validateToken = async (req, res, next) => {
  console.log("Reached Validate Token");
  // console.log(req);
  try {
    const combinedCookies = req.headers.cookie.split(";");
    let access_token, id_token;
    combinedCookies.forEach((cookie) => {
      const [name, value] = cookie.split("=");
      if (name.trim() === "access_token") {
        access_token = value;
      } else {
        id_token = value;
      }
    });
    const ticket = await client.verifyIdToken({
      idToken: id_token,
      audience: process.env.CLIENT_ID,
    });
    const payload = ticket.getPayload();
    req.sub = { new_uuid: payload.sub };
    return next();
  } catch (err) {
    console.log("error here");
    return next({ name: "UnauthorizedError", err: err });
  }
};

const jwtMiddleware = auth({
  audience: "http://localhost:3000",
  issuerBaseURL: "https://dev-1zb8k0zuzt6x1qmm.us.auth0.com/",
  tokenSigningAlg: "RS256",
});

module.exports = { validateToken, jwtMiddleware };
