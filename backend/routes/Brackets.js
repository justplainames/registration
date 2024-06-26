const express = require("express");
const router = express.Router();
const { Users, UsersCategories, Brackets } = require("../models");
const { finals, top4, top8, top16 } = require("./template");
// const { validateToken } = require("../middlewares/AuthMiddleware");
// router.use(validateToken);

// API endpoint to retrieve any bracket information based on the category and event.
// Finds bracket information and retrieves it
// if found, send it back to the server
// if not, get all participants in the event
// Rank them accordingly
// Create the top-n list based on user choice
// If tiebreaker send in the list
// else retrieve template and populate values.
router.get("/:event_id/:category_id/:type_id", async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const category_id = req.params.category_id;
    let limit = parseInt(req.params.type_id.split("top")[1]);
    const check = limit;
    const pre_type = req.params.type_id;
    const type = req.params.type_id.split(" ").join().toLocaleLowerCase();
    let bracket = await Brackets.findByPk(
      `${event_id.toString()}-${category_id.toString()}-${type}`
    );

    if (bracket) {
      let matches = bracket.dataValues.bracket_data.matches;

      for (const key in matches) {
        const final_match_info = [];
        if (pre_type !== key) {
          matches[key].forEach((seed) => {
            const to_change = seed;
            let prev_match_1 = null;
            let prev_match_2 = null;

            for (const value of seed.prevMatch) {
              const split = value.split("-");
              const type = split[0];
              const seed = split[1];
              const to_check = matches[`top${type}`].find((match) => {
                return match.seed == seed;
              });
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
          });
        } else {
          matches[key].map((data) => {
            final_match_info.push(data);
          });
        }

        matches[key] = final_match_info;
      }
      bracket.dataValues.matches = matches;

      // Before sending the bracket, do a check for missing names

      res.json(bracket.dataValues);
    } else {
      const usersRaw = await UsersCategories.findAll({
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

      const users = usersRaw.filter(
        (user) => user.order !== 0 && user.order !== null
      );
      if (users.length < limit) {
        res.status(200).json({
          message: "Not Enough Participants",
          needed: limit - users.length,
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
        to_modify.eventId = event_id;
        to_modify.catId = category_id;
        to_modify.matches[pre_type].forEach((match) => {
          const first_name = top_list.find((data) => {
            return match.seed * 2 === data.position;
          });
          const second_name = top_list.find(
            (data) => match.seed * 2 - 1 === data.position
          );
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
        res.json(to_modify);
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API endpoint to create the bracketing.
// Checks for scenarios such as whether there is lacking number of participants
// It also checks whether there is a need to handle a tiebreaker
router.post("/:event_id/:category_id/:type_id", async (req, res) => {
  try {
    const content = req.body;
    const event_id = req.params.event_id;
    const category_id = req.params.category_id;
    const type = req.params.type_id;
    let pre_type = req.params.type_id;
    if (pre_type === "top2") {
      pre_type = "finals";
    }
    let limit = parseInt(req.params.type_id.split("top")[1]) - content.number;

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
    to_modify.eventId = event_id;
    to_modify.catId = category_id;

    to_modify.matches[pre_type].forEach((match) => {
      const first_name = top_list.find((data) => {
        return match.seed * 2 === data.position;
      });
      const second_name = top_list.find(
        (data) => match.seed * 2 - 1 === data.position
      );
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
    res.json(to_modify);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API Endpoint to update the status of the bracket winner/loser
router.post(
  "/updateStatus/:event_id/:category_id/:type_id",
  async (req, res) => {
    try {
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
    } catch (error) {
      res.status(500).json({
        error: "Internal Server Error",
        message: error.message,
      });
    }
  }
);

module.exports = router;
