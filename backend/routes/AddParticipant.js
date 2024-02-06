const express = require("express");
const router = express.Router();
const {
  Categories,
  Scores,
  JudgesCategories,
  EventCategories,
  Participants,
  ParticipantsCategories,
} = require("../models");
const { Op } = require("sequelize");

router.get("/getCategories/:id", async (req, res) => {
  const categories = await EventCategories.findAll({
    where: {
      event_id_fk: req.params.id,
    },
  });
  const data = await Promise.all(
    categories.map(async (category) => {
      const cat_pk = category.category_id_fk;
      const category_name = await Categories.findByPk(cat_pk);

      return {
        category_name: category_name.dataValues.category_name,
        category_id_pk: cat_pk,
      };
    })
  );
  console.log(data);
  res.json(data);
});

router.get("/getParticipants/:event_id/:category_id", async (req, res) => {
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;
  console.log(event_id, category_id);

  const listOfParticipants = await ParticipantsCategories.findAll({
    where: {
      events_id_fk: event_id,
      category_id_fk: category_id,
    },
    attributes: ["participant_id_fk"],
    raw: true,
  });

  const participantIds = listOfParticipants.map(
    (participant) => participant.participant_id_fk
  );

  const data = await Participants.findAll({
    where: {
      participant_id_pk: {
        [Op.in]: participantIds,
      },
    },
    raw: true,
  });
  console.log(data);

  res.json(data);
  // const listOfCategories = await Promise.all(
  //   (
  //     await EventCategories.findAll({
  //       where: {
  //         event_id_fk: event_id,
  //       },
  //       attributes: ["category_id_fk"],
  //       raw: true,
  //     })
  //   ).map(async (category) => {
  //     const name = await Categories.findByPk(category.category_id_fk, {
  //       attributes: ["category_name"],
  //     });
  //     console.log(name);
  //     return {
  //       ...category,
  //       category_name: name.category_name,
  //     };
  //   })
  // );

  // res.json(listOfCategories);
});

router.post("/:id", async (req, res) => {
  const content = req.body;
  const event_id = req.params.id;
  const participant = {
    participant_name: content.participant_name,
    participant_email: content.participant_email,
    participant_instagram: content.participant_instagram,
    participant_paid: content.participant_paid,
    participant_phone_number: content.participant_phone_number,
  };

  const createdParticipant = await Participants.create(participant, {
    returning: ["participant_id_pk"],
  });

  const participant_id = createdParticipant.participant_id_pk;
  for (category of content.participant_categories) {
    const judges_ids = await JudgesCategories.findAll({
      where: {
        category_id_fk: category,
        event_id_fk: event_id,
      },
    });

    console.log("Judges IDs = ", judges_ids);

    await ParticipantsCategories.create({
      participant_id_fk: participant_id,
      category_id_fk: category,
      events_id_fk: event_id,
    });

    const score = {
      participant_id_fk: participant_id,
      event_id_fk: event_id,
      category_id_fk: category,
      score: 0,
    };

    for (judge of judges_ids) {
      console.log(judge);
      await Scores.create({
        ...score,
        judge_id_fk: judge.dataValues.judge_id_fk,
      });
    }
  }

  res.json("ok");
});

module.exports = router;
