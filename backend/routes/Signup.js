const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// router.use(cookieParser());
router.post("/", validateToken, async (req, res) => {
  console.log("\n\n\n\n\n\n\nREQUEST =", req.sub.new_uuid);
  console.log(req.body);
  const users = {
    user_id_pk: req.sub.new_uuid,
    user_name: req.body.user_name,
    user_instagram: req.body.user_instagram,
    user_email: req.body.user_email,
    user_phone_number: req.body.user_phone_number,
  };

  const test = await Users.create(users);
  console.log(test);
  res.json("ok");
});

module.exports = router;
