const express = require("express");
const router = express.Router();
const {
  Categories,
  Scores,
  Judges,
  JudgesCategories,
  EventCategories,
  Participants,
  ParticipantsCategories,
  Brackets,
} = require("../models");

router.get("/:event_id/:category_id", async (req, res) => {
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;

  const bracket = await Brackets.findByPk(
    `${event_id.toString()}-${category_id.toString()}`
  );
  res.json(bracket);
});

router.post("/:event_id/:category_id", async (req, res) => {
  const content = req.body;
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;
  await Brackets.update(
    { bracket_data: content.data },
    {
      where: {
        bracket_id_pk: `${event_id}-${category_id}`,
      },
    }
  );
});

module.exports = router;
