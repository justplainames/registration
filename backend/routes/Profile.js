const express = require("express");
const router = express.Router();
const { Users, UsersCategories, Events, Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// API endpoint to get user profile
router.get("/getInfo", validateToken, async (req, res) => {
  try {
    const user = await Users.findByPk(req.sub.new_uuid);
    const data = {
      user_name: user.user_name,
      user_instagram: user.user_instagram,
      user_email: user.user_email,
      user_phone_number: user.user_phone_number,
    };
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API endpoint to get all event info of the user
router.get("/getEvents", validateToken, async (req, res) => {
  try {
    const all_events = await UsersCategories.findAll({
      where: {
        user_id_fk: req.sub.new_uuid,
      },
      include: [
        {
          model: Events,
          attributes: ["event_name"], // Include specific attributes from the Event table
        },
        {
          model: Categories,
          attributes: ["category_name"], // Include specific attributes from the Category table
        },
      ],
      raw: true,
    });

    const groupedEvents = {};

    all_events.forEach((row) => {
      const eventId = row.event_id_fk;
      if (!groupedEvents[eventId]) {
        groupedEvents[eventId] = [];
      }
      groupedEvents[eventId].push(row);
    });
    res.json(groupedEvents);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API endpoint to update profile info
router.put("/updateInfo", validateToken, async (req, res) => {
  try {
    await Users.update(req.body, { where: { user_id_pk: req.sub.new_uuid } });
    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
