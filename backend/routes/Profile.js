const express = require("express");
const router = express.Router();
const { Users, UsersCategories, Events, Categories } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.get("/getInfo", validateToken, async (req, res) => {
  const user = await Users.findByPk(req.sub.new_uuid);
  //   const new_user = {...user, user_name: }
  // res.json(user.dataValues)
  const data = {
    user_name: user.user_name,
    user_instagram: user.user_instagram,
    user_email: user.user_email,
    user_phone_number: user.user_phone_number,
  };
  res.json(data);
});

router.get("/getEvents", validateToken, async (req, res) => {
  console.log("GET EVENTS");
  const all_events = await UsersCategories.findAll({
    where: {
      user_id_fk: req.sub.new_uuid,
    },
    include: [
      {
        model: Events,
        attributes: ["event_name"], // Include specific attributes from the Event table
      },
      {
        model: Categories,
        attributes: ["category_name"], // Include specific attributes from the Category table
      },
    ],
    raw: true,
  });

  const groupedEvents = {};

  all_events.forEach((row) => {
    const eventId = row.event_id_fk;
    if (!groupedEvents[eventId]) {
      groupedEvents[eventId] = [];
    }
    console.log("ASDASD", groupedEvents);
    groupedEvents[eventId].push(row);
  });
  console.log(groupedEvents);
  res.json(groupedEvents);
});

router.put("/updateInfo", validateToken, async (req, res) => {
  await Users.update(req.body, { where: { user_id_pk: req.sub.new_uuid } });
  //   const new_user = {...user, user_name: }
  // res.json(user.dataValues)
  res.json("ok");
});

module.exports = router;
