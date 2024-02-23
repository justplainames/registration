const express = require("express");
const router = express.Router();
const {
  Categories,
  Scores,
  JudgesCategories,
  EventCategories,
  Users,
  UsersCategories,
} = require("../models");
const { Op } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");

router.use(validateToken);

router.get("/getUsers", async (req, res) => {
  try {
    const users = await Users.findAll({ raw: true });
    res.json(users);
    console.log(users);
  } catch (error) {
    console.error("Error Retrieving data:", error);
  }
});

router.get("/getCategories/:id", async (req, res) => {
  console.log("\n\n", req.sub);
  const categories = await EventCategories.findAll({
    where: {
      event_id_fk: req.params.id,
    },
  });
  const data = await Promise.all(
    categories.map(async (category) => {
      const cat_pk = category.category_id_fk;
      const category_name = await Categories.findByPk(cat_pk);
      const check = await UsersCategories.findOne({
        where: {
          user_id_fk: req.sub.new_uuid,
          events_id_fk: req.params.id,
          category_id_fk: cat_pk,
        },
      });
      const joined = check ? true : false;
      return {
        category_name: category_name.dataValues.category_name,
        category_id_pk: cat_pk,
        joined: joined,
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

  const listOfUsers = await UsersCategories.findAll({
    where: {
      events_id_fk: event_id,
      category_id_fk: category_id,
    },
    attributes: ["user_id_fk"],
    raw: true,
  });

  const userIds = listOfUsers.map((user) => user.user_id_fk);

  const data = await Users.findAll({
    where: {
      user_id_pk: {
        [Op.in]: userIds,
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
  const temp = await Users.findByPk(req.sub.new_uuid, { raw: true });
  const role = temp.user_role;
  let user;
  if (role === "user") {
    user = temp;
  } else {
    user = {
      user_id_pk: content.user_id_pk,
      user_name: content.user_name,
      user_email: content.user_email,
      user_instagram: content.user_instagram,
      user_paid: content.user_paid,
      user_phone_number: content.user_phone_number,
    };
  }

  // // const createdUser = await Users.create(user, {
  // //   returning: ["user_id_pk"],
  // // });

  const user_id = user.user_id_pk;
  for (category of content.user_categories) {
    const judges_ids = await JudgesCategories.findAll({
      where: {
        category_id_fk: category,
        event_id_fk: event_id,
      },
    });

    console.log("Judges IDs = ", judges_ids);

    await UsersCategories.create({
      user_id_fk: user_id,
      category_id_fk: category,
      events_id_fk: event_id,
    });

    const score = {
      user_id_fk: user_id,
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

router.get("/joinEvent/getRole", async (req, res) => {
  const sub = req.sub.new_uuid;
  const role = await Users.findByPk(sub);
  console.log(role);
  res.json({ role: role.dataValues.user_role });
});

module.exports = router;
