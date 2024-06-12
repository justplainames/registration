const express = require("express");
const router = express.Router();
const { Users } = require("../models");

// API endpoint to create User
router.post("/", async (req, res) => {
  try {
    const users = {
      user_id_pk: req.body.user_id_pk,
      user_name: req.body.user_name,
      user_instagram: req.body.user_instagram,
      user_email: req.body.user_email,
      user_phone_number: req.body.user_phone_number,
    };

    await Users.create(users);
    res.status(200).json("Successfully Added");
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
