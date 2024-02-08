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
  console.log("HERE");
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;

  // Get all scores for each participant determined by event_id and Category_id
  // Scores has a n:n rs with the other tables hence fetch the associated data from Judges and Participants
  // Each result contains each score from different judges
  // Create new map to be sent back as a response
  // iterate through each row and a new element if a participant data not found in new map
  // If already in new map add the new judges info and score
  // Iterate through each map and add the total score according to participant_id_fk, catergory_id_fk and events_id_fk
  const scores = await Scores.findAll({
    where: {
      event_id_fk: event_id,
      category_id_fk: category_id,
    },
    include: [
      {
        model: Judges,
        attributes: ["judge_id_pk", "judge_name"],
      },
      {
        model: Participants,
        attributes: [
          "participant_id_pk",
          "participant_name",
          "participant_instagram",
        ],
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
  // data is a map object
  // data.values() - creates an iterable object of the values, removes the key and makes the values iterable
  // Array.from() - creates an array out of the data.values()
  // It now goes through each elemetn in the array and finds the total score based on the participant_id_fk, category_id_fk and events_id_fk
  // It adds the data to the total
  // const promises - Create a variable to store an array of promises
  // Array.from - Coverts an Array from the iterator object by data.values()

  const promises = Array.from(data.values()).map(async (row) => {
    const participantCategories = await ParticipantsCategories.findOne({
      where: {
        participant_id_fk: row.participant_id,
        category_id_fk: category_id,
        events_id_fk: event_id,
      },
    });

    if (participantCategories.dataValues.total_score == null) {
      let total = 0;
      row.judges.forEach((judge) => {
        total += parseFloat(judge.score);
      });
      row["total_score"] = total;
      await ParticipantsCategories.update(
        { total_score: total },
        {
          where: {
            participant_id_fk: row.participant_id,
            category_id_fk: category_id,
            events_id_fk: event_id,
          },
        }
      );
    } else {
      row["total_score"] = participantCategories.dataValues.total_score;
    }
    return row;
  });

  // Once all promises are fulfilled continue code
  const results = await Promise.all(promises);
  res.json(results);
});

router.put(
  "/updateScore/:event_id/:category_id/:judge_id/:participant_id",
  async (req, res) => {
    const event_id = req.params.event_id;
    const category_id = req.params.category_id;
    const judge_id = req.params.judge_id;
    const participant_id = req.params.participant_id;
    const value = parseFloat(req.body.new_score);
    console.log("event_id:", event_id);
    console.log("category_id:", category_id);
    console.log("judge_id:", judge_id);
    console.log("participant_id:", participant_id);
    console.log("value:", value);

    await Scores.update(
      { score: value },
      {
        where: {
          event_id_fk: event_id,
          category_id_fk: category_id,
          participant_id_fk: participant_id,
          judge_id_fk: judge_id,
        },
      }
    );

    const all_scores = await Scores.findAll({
      where: {
        event_id_fk: event_id,
        category_id_fk: category_id,
        participant_id_fk: participant_id,
      },
      raw: true,
    });

    let total = 0;
    all_scores.map((score) => {
      total += parseFloat(score.score);
    });

    await ParticipantsCategories.update(
      { total_score: total },
      {
        where: {
          events_id_fk: event_id,
          category_id_fk: category_id,
          participant_id_fk: participant_id,
        },
      }
    );

    console.log(req.body);

    // await Scores.update({
    //   where: {
    //     event_id_fk: event_id,
    //     category_id_fk: category_id,
    //     judge_id_fk: judge_id,
    //     participant_id_fk: participant_id
    //   },
    //   include: [
    //     {
    //       model: Judges,
    //       attributes: ["judge_id_pk", "judge_name"], // Include judge information
    //     },
    //     {
    //       model: Participants,
    //       attributes: [
    //         "participant_id_pk",
    //         "participant_name",
    //         "participant_instagram",
    //       ], // Include participant information
    //     },
    //   ],
    //   raw: true,
    // });
    // // res.json(scores);
    // const data = new Map();
    // scores.forEach((row) => {
    //   if (!data.has(row.participant_id_fk)) {
    //     data.set(row.participant_id_fk, {
    //       participant_id: row.participant_id_fk,
    //       participant_name: row["Participant.participant_name"],
    //       participant_instagram: row["Participant.participant_instagram"],
    //       judges: [
    //         {
    //           judge_id: row["Judge.judge_id_pk"],
    //           judge_name: row["Judge.judge_name"],
    //           score: row.score,
    //         },
    //       ],
    //     });
    //   } else {
    //     const current = data.get(row.participant_id_fk)["judges"];
    //     current.push({
    //       judge_id: row["Judge.judge_id_pk"],
    //       judge_name: row["Judge.judge_name"],
    //       score: row.score,
    //     });
    //     data.get(row.participant_id_fk)["judges"] = current;
    //   }
    // });

    // const mapToArray = Array.from(data.values());

    res.json(all_scores);
  }
);

module.exports = router;
