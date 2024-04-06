const express = require("express");
const router = express.Router();
const cookieParser = require("cookie-parser");
const { Users } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// router.use(cookieParser());
// API endpoint to create User
router.post("/", validateToken, async (req, res) => {
  try {
    const users = {
      user_id_pk: req.sub.new_uuid,
      user_name: req.body.user_name,
      user_instagram: req.body.user_instagram,
      user_email: req.body.user_email,
      user_phone_number: req.body.user_phone_number,
    };

    await Users.create(users);
    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
