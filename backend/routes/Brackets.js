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
  Sequelize,
} = require("../models");
const { finals, top4, top8, top16 } = require("./template");
const { validateToken } = require("../middlewares/AuthMiddleware");
router.use(validateToken);

// API endpoint to retrieve any bracket information based on the category and event.
// Finds bracket information and retrieves it
// if found, send it back to the server
// if not, get all participants in the event
// Rank them accordingly
// Create the top-n list based on user choice
// If tiebreaker send in the list
// else retrieve template and populate values.
router.get("/:event_id/:category_id/:type_id", async (req, res) => {
  console.log("Body in bracket.js", req.body);
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;
  let limit = parseInt(req.params.type_id.split("top")[1]);
  const check = limit;
  const pre_type = req.params.type_id;
  const type = req.params.type_id.split(" ").join().toLocaleLowerCase();
  console.log("pre_type =", pre_type);
  console.log("type =", type);
  console.log("CATEGORY TYPE = ", category_id);
  let bracket = await Brackets.findByPk(
    `${event_id.toString()}-${category_id.toString()}-${type}`
  );

  if (bracket) {
    console.log(
      "bracket datavalues after retrieving from database: ",
      bracket.dataValues
    );

    let matches = bracket.dataValues.bracket_data.matches;

    console.log("Open up matches ", matches);
    for (const key in matches) {
      const final_match_info = [];
      if (pre_type !== key) {
        matches[key].forEach((seed) => {
          console.log("seed to change", seed);
          const to_change = seed;
          let prev_match_1 = null;
          let prev_match_2 = null;

          for (const value of seed.prevMatch) {
            const split = value.split("-");
            const type = split[0];
            const seed = split[1];
            console.log("Split = ", type, seed);
            const to_check = matches[`top${type}`].find((match) => {
              return match.seed == seed;
            });
            console.log("To Check = ", to_check);
            if (to_check.seed_status !== null) {
              if (prev_match_1 === null) {
                prev_match_1 = to_check;
              } else {
                if (prev_match_1.seed > to_check.seed) {
                  prev_match_2 = prev_match_1;
                  prev_match_1 = to_check;
                } else {
                  prev_match_2 = to_check;
                }
              }
            }
          }
          console.log("First Match =", prev_match_1);
          console.log("Second Match =", prev_match_2);

          if (prev_match_1 !== null) {
            if (prev_match_1.first.status) {
              to_change.first.stage_name = prev_match_1.first.stage_name;
            } else {
              to_change.first.stage_name = prev_match_1.second.stage_name;
            }
          }

          if (prev_match_2 !== null) {
            if (prev_match_2.first.status) {
              to_change.second.stage_name = prev_match_2.first.stage_name;
            } else {
              to_change.second.stage_name = prev_match_2.second.stage_name;
            }
          }

          final_match_info.push(to_change);

          // const prev_bracket = `top${}`
          // console.log("SEED = ", seed);
        });
      } else {
        matches[key].map((data) => {
          final_match_info.push(data);
        });
      }

      matches[key] = final_match_info;
    }
    console.log("new Match =", { ...matches });
    bracket.dataValues.matches = matches;

    // Before sending the bracket, do a check for missing names

    res.json(bracket.dataValues);
  } else {
    const users = await UsersCategories.findAll({
      where: { category_id_fk: category_id, event_id_fk: event_id },
      include: [
        {
          model: Users,
          attributes: ["user_name"],
          required: true,
        },
      ],
      order: [["total_score", "DESC"]],
      raw: true,
    });
    console.log("testingEIsen", users);
    if (users.length < limit) {
      res.status(400).json({
        error: {
          message: "Not Enough Participants",
          needed: limit - users.length,
        },
      });
      return;
    }
    let current = 999999;
    const top_list = [];
    let count = 1;
    for (key in users) {
      const to_compare = parseFloat(users[key].total_score);
      if (current == to_compare || limit >= 1) {
        top_list.push({ ...users[key], position: count });
        count += 1;
        limit -= 1;
        current = to_compare;
      } else {
        break;
      }
    }
    const to_return = [];
    const current_least = top_list[top_list.length - 1].total_score;
    let to_choose = null;
    let data = null;

    if (top_list.length > check) {
      for (let i = top_list.length - 1; i >= 0; i--) {
        if (current_least === top_list[i].total_score) {
          to_return.push(top_list[i]);
        }
      }

      to_choose = to_return.length - (top_list.length - check);

      res.json({ to_choose: to_choose, data: to_return });
      return;
    } else {
      switch (type) {
        case "top2":
          data = finals;
          break;
        case "top4":
          data = top4;
          break;
        case "top8":
          data = top8;
          break;
        case "top16":
          data = top16;
          break;
        default:
          break;
      }

      const to_modify = { ...data };
      console.log("TO_MODIFY = ", to_modify);
      console.log("TOP_LIST =", top_list);
      to_modify.eventId = event_id;
      to_modify.catId = category_id;
      to_modify.matches[pre_type].forEach((match) => {
        console.log("Match =  ", match);
        console.log("To return =  ", to_return);

        const first_name = top_list.find((data) => {
          console.log("DATA", data);
          return match.seed * 2 === data.position;
        });
        const second_name = top_list.find(
          (data) => match.seed * 2 - 1 === data.position
        );
        console.log("Match =  ", match);
        console.log("FIRST_NAME =  ", first_name);
        match.first = {
          ...match.first,
          stage_name: first_name["User.user_name"],
        };
        match.second = {
          ...match.second,
          stage_name: second_name["User.user_name"],
        };
      });
      console.log("TO MODIFY = ", to_modify.matches.top4[0].first);
      await Brackets.create({
        bracket_id_pk: `${event_id.toString()}-${category_id.toString()}-${type}`,
        bracket_data: to_modify,
      });
      console.log(to_modify);
      res.json(to_modify);
    }
  }

  // let data = null;
  // if (bracket === null) {
  //   console.log("IT CAME HERE BECAAUSE BRACKET == NULL REALLY?");
  //   console.log("bracket +++++++ ", bracket);

  // }
  // if (bracket === null) {
  //   await Brackets.create({
  //     bracket_id_pk: `${event_id.toString()}-${category_id.toString()}-${type}`,
  //     bracket_data: data,
  //   });

  //   res.json({
  //     bracket_id_pk: `${event_id.toString()}-${category_id.toString()}-${type}`,
  //     bracket_data: data,
  //   });
  // } else {
  //   res.json(bracket);
  // }
  // res.json("ok");
});

router.post("/:event_id/:category_id/:type_id", async (req, res) => {
  const content = req.body;
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;
  const type = req.params.type_id;
  let pre_type = req.params.type_id;
  if (pre_type === "top2") {
    pre_type = "finals";
  }
  let limit = parseInt(req.params.type_id.split("top")[1]) - content.number;
  console.log(content);

  const users = await UsersCategories.findAll({
    where: { category_id_fk: category_id, event_id_fk: event_id },
    include: [
      {
        model: Users,
        attributes: ["user_name"],
        required: true,
      },
    ],
    order: [["total_score", "DESC"]],
    raw: true,
  });
  let count = 1;
  const top_list = [];
  for (key in users) {
    if (limit >= 1) {
      top_list.push({ ...users[key], position: count });
      count += 1;
      limit -= 1;
    } else {
      break;
    }
  }

  content.data.map((row) => {
    top_list.push({ ...row, position: count });
    count += 1;
  });

  const to_return = [];
  let data = null;

  switch (type) {
    case "top2":
      data = finals;
      break;
    case "top4":
      data = top4;
      break;
    case "top8":
      data = top8;
      break;
    case "top16":
      data = top16;
      break;
    default:
      break;
  }

  const to_modify = { ...data };
  console.log("TO_MODIFY = ", to_modify);
  console.log("TOP_LIST =", top_list);
  to_modify.eventId = event_id;
  to_modify.catId = category_id;

  to_modify.matches[pre_type].forEach((match) => {
    console.log("Match =  ", match);
    console.log("To return =  ", to_return);
    const first_name = top_list.find((data) => {
      console.log("DATA", data);
      return match.seed * 2 === data.position;
    });
    const second_name = top_list.find(
      (data) => match.seed * 2 - 1 === data.position
    );
    console.log("Match =  ", match);
    console.log("FIRST_NAME =  ", first_name);
    match.first = {
      ...match.first,
      stage_name: first_name["User.user_name"],
    };
    match.second = {
      ...match.second,
      stage_name: second_name["User.user_name"],
    };
  });
  await Brackets.create({
    bracket_id_pk: `${event_id.toString()}-${category_id.toString()}-${type}`,
    bracket_data: to_modify,
  });
  console.log(to_modify);
  res.json(to_modify);
});

router.post(
  "/updateStatus/:event_id/:category_id/:type_id",
  async (req, res) => {
    console.log("CAME HERE THE POST ");
    const content = req.body;
    const event_id = req.params.event_id;
    const category_id = req.params.category_id;
    const type_id = req.params.type_id;

    await Brackets.update(
      { bracket_data: content.data },
      {
        where: {
          bracket_id_pk: `${event_id}-${category_id}-${type_id}`,
        },
      }
    );
    res.json("Ok");
  }
);

module.exports = router;
