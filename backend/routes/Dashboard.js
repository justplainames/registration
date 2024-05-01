const express = require("express");
const router = express.Router();
const { Events } = require("../models");

router.get("/getEvents", async (req, res) => {
  try {
    const events = await Events.findAll();
    events.map((item) => {
      const dateObject = new Date(item.dataValues.event_date);
      item.dataValues.event_date = dateObject.toLocaleDateString("en-GB");
    });
    res.json(events);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server",
    });
  }
});

module.exports = router;
