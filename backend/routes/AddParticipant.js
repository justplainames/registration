const express = require("express");
const router = express.Router();
const {
  Categories,
  Scores,
  JudgesCategories,
  EventCategories,
  Users,
  UsersCategories,
  sequelize,
} = require("../models");

const crypto = require("crypto");

// API to get retrueve all users
router.get("/getUsers", async (req, res) => {
  try {
    const users = await Users.findAll({ raw: true });
    res.json(users);
  } catch (error) {
    console.error("Error Retrieving list of users:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to get retrueve user information on which categories in a particular event they joined
router.get("/getUserCategory/:event_id/:user_id", async (req, res) => {
  const event_id = req.params.event_id;
  const user_id = req.params.user_id;
  try {
    const joined = await UsersCategories.findAll({
      where: {
        user_id_fk: user_id,
        event_id_fk: event_id,
      },
      attributes: ["category_id_fk"],
      raw: true,
    });

    const available = await EventCategories.findAll({
      where: {
        event_id_fk: event_id,
      },

      raw: true,
    });

    const joinedCategoryIds = joined.map((row) => row.category_id_fk);
    const filteredAvailable = available.filter(
      (category) => !joinedCategoryIds.includes(category.category_id_fk)
    );
    const categoryIds = filteredAvailable.map(
      (category) => category.category_id_fk
    );

    const final_data = await Categories.findAll({
      where: {
        category_id_pk: categoryIds,
      },
      attributes: ["category_id_pk", "category_name"],
      raw: true,
    });

    res.json(final_data);
  } catch (error) {
    console.error("Error Retrieving user catgory data:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to get retrueve user information on which categories in a particular event they joined
router.get("/getCategories/:id", async (req, res) => {
  const authorizationHeader = req.headers["authorization"];
  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
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
            user_id_fk: req.auth.payload.sub,
            event_id_fk: req.params.id,
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
    res.json(data);
  } catch (error) {
    console.error("Error Retrieving user category data:", error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to get list of participants for a particular event and particular category
router.get("/getParticipants/:event_id/:category_id", async (req, res) => {
  try {
    const event_id = req.params.event_id;
    const category_id = req.params.category_id;

    const listOfUsers = await UsersCategories.findAll({
      where: {
        event_id_fk: event_id,
        category_id_fk: category_id,
      },
      include: [
        {
          model: Users,
          as: "User",
        },
      ],
      raw: true,
    });

    const formatted = listOfUsers.map((row) => {
      const user = {
        user_id_fk: row.user_id_fk,
        category_id_fk: row.category_id_fk,
        event_id_fk: row.event_id_fk,
        order: row.order,
        total_score: row.total_score,
        user_name: row["User.user_name"],
        user_instagram: row["User.user_instagram"],
        user_phone_number: row["User.user_phone_number"],
        user_email: row["User.user_email"],
      };
      return user;
    });
    res.json(formatted);
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// TO COMMENT
router.post("/:id", async (req, res) => {
  try {
    const event_id = req.params.id;
    const content = req.body;
    const role = req.auth.payload["http://localhost:3000/roles"][0];
    let user;
    if (role !== "Admin") {
      user = await Users.findByPk(req.auth.payload.sub, { raw: true });
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

    const user_id = user.user_id_pk;
    for (category of content.user_categories) {
      const judges_ids = await JudgesCategories.findAll({
        where: {
          category_id_fk: category,
          event_id_fk: event_id,
        },
      });

      await UsersCategories.create({
        user_id_fk: user_id,
        category_id_fk: category,
        event_id_fk: event_id,
      });

      const score = {
        user_id_fk: user_id,
        event_id_fk: event_id,
        category_id_fk: category,
        score: 0,
      };

      for (judge of judges_ids) {
        await Scores.create({
          ...score,
          judge_id_fk: judge.dataValues.judge_id_fk,
        });
      }
    }
    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to get the role of the user, to check if "admin" or "user"
router.get("/joinEvent/getRole", async (req, res) => {
  try {
    const sub = req.sub.new_uuid;
    const role = await Users.findByPk(sub);
    res.json({
      role: role.dataValues.user_role,
      user_name: role.dataValues.user_name,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to update the order number of the participant
router.put("/updateOrder", async (req, res) => {
  try {
    if (!req.body.to_remove) {
      await EventCategories.update(
        {
          used_numbers: sequelize.fn(
            "array_append",
            sequelize.col("used_numbers"),
            req.body.to_update.order
          ),
        },
        {
          where: {
            event_id_fk: req.body.to_update.event_id_fk,
            category_id_fk: req.body.to_update.category_id_fk,
          },
        }
      );

      await UsersCategories.update(
        { order: req.body.to_update.order },
        {
          where: {
            category_id_fk: req.body.to_update.category_id_fk,
            event_id_fk: req.body.to_update.event_id_fk,
            user_id_fk: req.body.to_update.user_id_fk,
          },
        }
      );
    } else {
      await EventCategories.update(
        {
          used_numbers: sequelize.fn(
            "array_remove",
            sequelize.col("used_numbers"),
            req.body.to_update.order
          ),
        },
        {
          where: {
            event_id_fk: req.body.to_update.event_id_fk,
            category_id_fk: req.body.to_update.category_id_fk,
          },
        }
      );
      await UsersCategories.update(
        { order: null },
        {
          where: {
            category_id_fk: req.body.to_update.category_id_fk,
            event_id_fk: req.body.to_update.event_id_fk,
            user_id_fk: req.body.to_update.user_id_fk,
          },
        }
      );
    }

    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to get the a usable order number to assign the user
router.get("/usedNumbers/:event_id/:category_id/:user_id", async (req, res) => {
  try {
    const event_id_fk = req.params.event_id;
    const category_id_fk = req.params.category_id;
    const user_id_fk = req.params.user_id;
    const users = await UsersCategories.findAll({
      where: {
        event_id_fk: event_id_fk,
        category_id_fk: category_id_fk,
      },
      raw: true,
    });
    const user = users.find((row) => {
      return row.user_id_fk === user_id_fk;
    });
    if (user.order) {
      res.json({ status: "assigned", data: user.order });
      return;
    }
    const max = users.length;
    const used_numbers = await EventCategories.findOne({
      where: {
        event_id_fk: event_id_fk,
        category_id_fk: category_id_fk,
      },
      raw: true,
    });

    while (true) {
      const random_int = crypto.randomInt(1, max + 1);
      if (used_numbers.used_numbers.includes(random_int)) {
      } else {
        res.json({ status: "success", data: random_int });
        return;
      }
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.put("/manual/updateOrder", async (req, res) => {
  try {
    const user = await UsersCategories.findOne({
      where: {
        category_id_fk: req.body.user_info.category_id_fk,
        event_id_fk: req.body.user_info.event_id_fk,
        user_id_fk: req.body.user_info.user_id_fk,
      },
      raw: true,
    });

    const used_numbers = await EventCategories.findOne({
      where: {
        category_id_fk: req.body.user_info.category_id_fk,
        event_id_fk: req.body.user_info.event_id_fk,
      },
      raw: true,
      attributes: ["used_numbers"],
    });

    // If user changed to 0 from a different number
    if (parseInt(req.body.value) === 0 && user.order) {
      if (used_numbers.used_numbers.includes(user.order)) {
        await EventCategories.update(
          {
            used_numbers: sequelize.fn(
              "array_remove",
              sequelize.col("used_numbers"),
              parseInt(user.order)
            ),
          },
          {
            where: {
              event_id_fk: req.body.user_info.event_id_fk,
              category_id_fk: req.body.user_info.category_id_fk,
            },
          }
        );
        await UsersCategories.update(
          { order: null },
          {
            where: {
              category_id_fk: req.body.user_info.category_id_fk,
              event_id_fk: req.body.user_info.event_id_fk,
              user_id_fk: req.body.user_info.user_id_fk,
            },
          }
        );
      } else {
        await UsersCategories.update(
          { order: null },
          {
            where: {
              category_id_fk: req.body.user_info.category_id_fk,
              event_id_fk: req.body.user_info.event_id_fk,
              user_id_fk: req.body.user_info.user_id_fk,
            },
          }
        );
      }
      res.json("ok");
      return;
    }

    // if user changed Numbers
    else {
      if (used_numbers.used_numbers.includes(parseInt(req.body.value))) {
        res.json(user.order);
        return;
      } else {
        if (user.order) {
          await EventCategories.update(
            {
              used_numbers: sequelize.fn(
                "array_remove",
                sequelize.col("used_numbers"),
                user.order
              ),
            },
            {
              where: {
                event_id_fk: req.body.user_info.event_id_fk,
                category_id_fk: req.body.user_info.category_id_fk,
              },
            }
          );
        }

        await EventCategories.update(
          {
            used_numbers: sequelize.fn(
              "array_append",
              sequelize.col("used_numbers"),
              parseInt(req.body.value)
            ),
          },
          {
            where: {
              event_id_fk: req.body.user_info.event_id_fk,
              category_id_fk: req.body.user_info.category_id_fk,
            },
          }
        );
        await UsersCategories.update(
          { order: parseInt(req.body.value) },
          {
            where: {
              category_id_fk: req.body.user_info.category_id_fk,
              event_id_fk: req.body.user_info.event_id_fk,
              user_id_fk: req.body.user_info.user_id_fk,
            },
          }
        );
      }
      res.json("ok");
      return;
    }
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API to delete participant (NOT THE USER) from a particular event from a particular category
router.delete("/deleteParticipant", async (req, res) => {
  try {
    const user_info = req.body;
    const user_id_fk = user_info.user_id_fk;
    const event_id_fk = user_info.event_id_fk;
    const category_id_fk = user_info.category_id_fk;
    const order = user_info.order;

    if (order) {
      await EventCategories.update(
        {
          used_numbers: sequelize.fn(
            "array_remove",
            sequelize.col("used_numbers"),
            order
          ),
        },
        {
          where: {
            event_id_fk: event_id_fk,
            category_id_fk: category_id_fk,
          },
        }
      );
    }

    await UsersCategories.destroy({
      where: {
        user_id_fk: user_id_fk,
        event_id_fk: event_id_fk,
        category_id_fk: category_id_fk,
      },
    });

    await Scores.destroy({
      where: {
        user_id_fk: user_id_fk,
        event_id_fk: event_id_fk,
        category_id_fk: category_id_fk,
      },
    });
    res.json("ok");
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});
module.exports = router;
