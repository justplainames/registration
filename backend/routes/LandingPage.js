const express = require("express");
const router = express.Router();
const { Events } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/getEvents", validateToken, async (req, res) => {
  const events = await Events.findAll();
  events.map((item) => {
    const dateObject = new Date(item.dataValues.event_date);
    item.dataValues.event_date = dateObject.toLocaleDateString("en-GB");
  });
  res.json(events);
});

module.exports = router;
