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
} = require("../models");
const { Op } = require("sequelize");

router.get("/:event_id/:category_id", async (req, res) => {
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;

  const scores = await Scores.findAll({
    where: {
      event_id_fk: event_id,
      category_id_fk: category_id,
    },
    include: [
      {
        model: Judges,
        attributes: ["judge_id_pk", "judge_name"], // Include judge information
      },
      {
        model: Participants,
        attributes: [
          "participant_id_pk",
          "participant_name",
          "participant_instagram",
        ], // Include participant information
      },
    ],
    raw: true,
  });
  // res.json(scores);
  const data = new Map();
  scores.forEach((row) => {
    if (!data.has(row.participant_id_fk)) {
      data.set(row.participant_id_fk, {
        participant_id: row.participant_id_fk,
        participant_name: row["Participant.participant_name"],
        participant_instagram: row["Participant.participant_instagram"],
        judges: [
          {
            judge_id: row["Judge.judge_id_pk"],
            judge_name: row["Judge.judge_name"],
            score: row.score,
          },
        ],
      });
    } else {
      const current = data.get(row.participant_id_fk)["judges"];
      current.push({
        judge_id: row["Judge.judge_id_pk"],
        judge_name: row["Judge.judge_name"],
        score: row.score,
      });
      data.get(row.participant_id_fk)["judges"] = current;
    }
  });

  const mapToArray = Array.from(data.values());
  res.json(mapToArray);
});

module.exports = router;
