const express = require("express");
const router = express.Router();
const { Values } = require("../models");

// API endpoint to get sall scores
router.get("/", async (req, res) => {
  try {
    const value = await Values.findByPk(6);
    res.json(value);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

// API endpoint get update all scores
router.put("/", async (req, res) => {
  try {
    const value = await Values.findByPk(6);
    const new_value = value.counts + 1;

    await Values.update(
      { counts: new_value },
      {
        where: {
          id: 6,
        },
      }
    );
    res.json({ new_value });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
