const express = require("express");
const router = express.Router();
const {
  Categories,
  Scores,
  Judges,
  JudgesCategories,
  EventCategories,
  Users,
  UsersCategories,
  Brackets,
} = require("../models");
const { Op } = require("sequelize");

router.get("/:event_id/:category_id", async (req, res) => {
  console.log("HERE");
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;
  console.log("TESTING", event_id, category_id);

  // Get all scores for each participant determined by event_id and Category_id
  // Scores has a n:n rs with the other tables hence fetch the associated data from Judges and Participants
  // Each result contains each score from different judges
  // Create new map to be sent back as a response
  // iterate through each row and a new element if a participant data not found in new map
  // If already in new map add the new judges info and score
  // Iterate through each map and add the total score according to participant_id_fk, catergory_id_fk and event_id_fk
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
        model: Users,
        attributes: ["user_id_pk", "user_name", "user_instagram"],
      },
    ],
    raw: true,
  });
  console.log("SCOREs = ", scores);
  // res.json(scores);
  const data = new Map();
  scores.forEach((row) => {
    if (!data.has(row.user_id_fk)) {
      data.set(row.user_id_fk, {
        user_id: row.user_id_fk,
        user_name: row["User.user_name"],
        user_instagram: row["User.user_instagram"],
        judges: [
          {
            judge_id: row["Judge.judge_id_pk"],
            judge_name: row["Judge.judge_name"],
            score: row.score,
          },
        ],
      });
    } else {
      const current = data.get(row.user_id_fk)["judges"];
      current.push({
        judge_id: row["Judge.judge_id_pk"],
        judge_name: row["Judge.judge_name"],
        score: row.score,
      });
      data.get(row.user_id_fk)["judges"] = current;
    }
  });
  // data is a map object
  // data.values() - creates an iterable object of the values, removes the key and makes the values iterable
  // Array.from() - creates an array out of the data.values()
  // It now goes through each elemetn in the array and finds the total score based on the participant_id_fk, category_id_fk and event_id_fk
  // It adds the data to the total
  // const promises - Create a variable to store an array of promises
  // Array.from - Coverts an Array from the iterator object by data.values()

  const promises = Array.from(data.values()).map(async (row) => {
    console.log("ROW = ", row);
    const userCategories = await UsersCategories.findOne({
      where: {
        user_id_fk: row.user_id,
        category_id_fk: category_id,
        event_id_fk: event_id,
      },
    });

    if (userCategories.dataValues.total_score == null) {
      let total = 0;
      row.judges.forEach((judge) => {
        total += parseFloat(judge.score);
      });
      row["total_score"] = total;
      await UsersCategories.update(
        { total_score: total },
        {
          where: {
            user_id_fk: row.user_id,
            category_id_fk: category_id,
            event_id_fk: event_id,
          },
        }
      );
    } else {
      row["total_score"] = userCategories.dataValues.total_score;
    }
    return row;
  });

  // Once all promises are fulfilled continue code
  const results = await Promise.all(promises);
  res.json(results);
});

router.put(
  "/updateScore/:event_id/:category_id/:judge_id/:user_id",
  async (req, res) => {
    const event_id = req.params.event_id;
    const category_id = req.params.category_id;
    const judge_id = req.params.judge_id;
    const user_id = req.params.user_id;
    const bracket_id = `${event_id}-${category_id}-`;
    const value = parseFloat(req.body.new_score);
    console.log("event_id:", event_id);
    console.log("category_id:", category_id);
    console.log("judge_id:", judge_id);
    console.log("user_id:", user_id);
    console.log("value:", value);

    await Scores.update(
      { score: value },
      {
        where: {
          event_id_fk: event_id,
          category_id_fk: category_id,
          user_id_fk: user_id,
          judge_id_fk: judge_id,
        },
      }
    );

    await Brackets.findAll({
      where: {
        bracket_id_pk: {
          [Op.like]: `${bracket_id}%`,
        },
      },
      attributes: ["bracket_id_pk"],
      raw: true,
    }).then(async (results) => {
      const deletePromises = results.map(async (bracket) => {
        await Brackets.destroy({
          where: {
            bracket_id_pk: bracket.bracket_id_pk,
          },
        });
      });
      await Promise.all(deletePromises);
    });

    const all_scores = await Scores.findAll({
      where: {
        event_id_fk: event_id,
        category_id_fk: category_id,
        user_id_fk: user_id,
      },
      raw: true,
    });

    let total = 0;
    all_scores.map((score) => {
      total += parseFloat(score.score);
    });

    await UsersCategories.update(
      { total_score: total },
      {
        where: {
          event_id_fk: event_id,
          category_id_fk: category_id,
          user_id_fk: user_id,
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
