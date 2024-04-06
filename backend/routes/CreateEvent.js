const express = require("express");
const router = express.Router();
const {
  Categories,
  Events,
  Judges,
  JudgesCategories,
  EventCategories,
} = require("../models");
const moment = require("moment");

// API endpoint to get all the different categories available
router.get("/getCategories", async (req, res) => {
  try {
    const categories = await Categories.findAll();
    const data = categories.map((category) => {
      return {
        value: {
          category_name: JSON.stringify(category.category_name),
          category_id_pk: JSON.stringify(category.category_id_pk),
        },
        label: JSON.stringify(category.category_name),
      };
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API route to get all judges available
router.get("/getJudges", async (req, res) => {
  try {
    const judges = await Judges.findAll();
    const data = judges.map((judge) => {
      return {
        value: {
          judge_name: JSON.stringify(judge.judge_name),
          judge_id_pk: JSON.stringify(judge.judge_id_pk),
        },
        label: JSON.stringify(judge.judge_name),
      };
    });
    res.json(data);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API endpoint to create event
router.post("/updateEvent", async (req, res) => {
  try {
    const content = req.body;
    const event = {
      event_name: content.event_name,
      event_date: moment(content.event_date, "DD/MM/YYYY").toDate(),
      event_description: content.event_description,
      event_location: content.event_location,
    };

    const createdEvent = await Events.create(event, {
      returning: ["event_id_pk"],
    });

    const parsedData = JSON.parse(content.event_information);
    const finalData = Object.entries(parsedData);

    const eventId = createdEvent.event_id_pk;

    for (const [key, value] of finalData) {
      await EventCategories.create({
        event_id_fk: eventId,
        category_id_fk: key,
        num_of_judges: value.length,
      });
    }

    for (const [key, value] of finalData) {
      for (const judge of value) {
        await JudgesCategories.create({
          event_id_fk: eventId,
          category_id_fk: key,
          judge_id_fk: judge.value.judge_id_pk,
        });
      }
    }

    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API endpoint to create rows in the database for the table JudgesCategories
// Create rows that maps judges to categories
router.post("/updateJudgesCategories", async (req, res) => {
  try {
    const content = req.body;
    Object.entries(content).forEach(([key, value]) => {
      console.log(key);
      value.map(async (item) => {
        await JudgesCategories.create({
          judge_id_fk: item.value.judge_id_pk,
          category_id_fk: key,
        });
      });
    });

    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

module.exports = router;
