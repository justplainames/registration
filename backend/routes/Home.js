const express = require("express");
const router = express.Router();
const { Values } = require("../models");

router.get("/", async (req, res) => {
  const value = await Values.findByPk(6);
  res.json(value);
});

router.put("/", async (req, res) => {
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
});

module.exports = router;
