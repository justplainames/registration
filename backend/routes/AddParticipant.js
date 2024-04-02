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
// const { Sequelize } = require("sequelize");
const { validateToken } = require("../middlewares/AuthMiddleware");
const crypto = require("crypto");

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

router.get("/getUserCategory/:event_id/:user_id", async (req, res) => {
  const event_id = req.params.event_id;
  const user_id = req.params.user_id;
  console.log(user_id, event_id);
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
    console.log(available);

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
    console.log("alksd", joinedCategoryIds);
    console.log(filteredAvailable);

    console.log("filtered", categoryIds);
    console.log("FinalData", final_data);

    res.json(final_data);
  } catch (error) {
    console.error("Error Retrieving data:", error);
  }
});

// router.get("/getUsers/:eventId", async (req, res) => {
//   const event_id_pk = req.params.eventId;
//   try {
//     const users = await Users.findAll({
//       raw: true,
//       attributes: [
//         "user_id_pk",
//         "user_name",
//         "user_instagram",
//         "user_phone_number",
//         "user_email",
//       ],
//       include: {
//         model: UsersCategories,
//         as: "UsersCategories",
//         attributes: ["category_id_fk", "event_id_fk"],
//       },
//     });
//     console.log(users);
//     const final_data = {};
//     users.forEach((row) => {
//       const { user_id_pk, ...user_data } = row;

//       if (!final_data[user_id_pk]) {
//         final_data[user_id_pk] = {
//           ...user_data,
//           usersCategories: [],
//         };
//       }
//       final_data[user_id_pk].usersCategories.push(
//         row["UsersCategories.category_id_fk"]
//       );
//     });
//     console.log(final_data);
//     res.json(Object.values(final_data));
//   } catch (error) {
//     console.error("Error Retrieving data:", error);
//   }
// });

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
  console.log(data);
  res.json(data);
});

// router.get("/getCategories/:id", async (req, res) => {
//   console.log("\n\n", req.sub);
//   const categories = await EventCategories.findAll({
//     where: {
//       event_id_fk: req.params.id,
//     },
//   });
//   const data = await Promise.all(
//     categories.map(async (category) => {
//       const cat_pk = category.category_id_fk;
//       const category_name = await Categories.findByPk(cat_pk);
//       const check = await UsersCategories.findOne({
//         where: {
//           user_id_fk: req.sub.new_uuid,
//           event_id_fk: req.params.id,
//           category_id_fk: cat_pk,
//         },
//       });
//       const joined = check ? true : false;
//       return {
//         category_name: category_name.dataValues.category_name,
//         category_id_pk: cat_pk,
//         joined: joined,
//       };
//     })
//   );
//   console.log(data);
//   res.json(data);
// });

router.get("/getParticipants/:event_id/:category_id", async (req, res) => {
  const event_id = req.params.event_id;
  const category_id = req.params.category_id;
  console.log(event_id, category_id);

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
    // attributes: ["user_id_fk"],
    raw: true,
  });

  console.log("List of Users", listOfUsers);

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

  console.log("NEW SET", formatted);
  // const data = await Users.findAll({
  //   where: {
  //     user_id_pk: {
  //       [Op.in]: userIds,
  //     },
  //   },

  //   raw: true,
  // });

  res.json(formatted);
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
      event_id_fk: event_id,
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
  res.json({
    role: role.dataValues.user_role,
    user_name: role.dataValues.user_name,
  });
});

router.put("/updateOrder", async (req, res) => {
  console.log(req.body);
  if (!req.body.to_remove) {
    console.log("Entered To Add");
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
    console.log("Entered To Remove");
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
});

router.get("/usedNumbers/:event_id/:category_id/:user_id", async (req, res) => {
  console.log("test");
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
  console.log("user in get", user);
  console.log("event_Id", event_id_fk);
  console.log("categort_id_pk", category_id_fk);
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
    // attributes: ["used_numbers"],
    raw: true,
  });
  console.log("used Numbers", used_numbers);
  console.log("max Range = ", max);

  while (true) {
    const random_int = crypto.randomInt(1, max + 1);
    console.log("got number", random_int);
    if (used_numbers.used_numbers.includes(random_int)) {
      console.log("Missed");
    } else {
      console.log("giving number", random_int);

      res.json({ status: "success", data: random_int });
      return;
    }
  }
});

router.put("/manual/updateOrder", async (req, res) => {
  console.log(req.body);

  const user = await UsersCategories.findOne({
    where: {
      category_id_fk: req.body.user_info.category_id_fk,
      event_id_fk: req.body.user_info.event_id_fk,
      user_id_fk: req.body.user_info.user_id_fk,
    },
    raw: true,
  });
  console.log(user);

  const used_numbers = await EventCategories.findOne({
    where: {
      category_id_fk: req.body.user_info.category_id_fk,
      event_id_fk: req.body.user_info.event_id_fk,
    },
    raw: true,
    attributes: ["used_numbers"],
  });
  console.log(used_numbers);

  console.log(
    "TESTING = ",
    req.body.value,
    parseInt(req.body.value) === 0,
    user.order,
    used_numbers.used_numbers.includes(user.order)
  );
  // If user changed to 0 from a different number
  if (parseInt(req.body.value) === 0 && user.order) {
    console.log("entered if");
    if (used_numbers.used_numbers.includes(user.order)) {
      console.log("testing", req.body.user_info.order);
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
    console.log("entered else");
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
  // } else {
  //   await EventCategories.update(
  //     {
  //       used_numbers: sequelize.fn(
  //         "array_remove",
  //         sequelize.col("used_numbers"),
  //         req.body.user_info.order
  //       ),
  //     },
  //     {
  //       where: {
  //         event_id_fk: req.body.user_info.event_id_fk,
  //         category_id_fk: req.body.user_info.category_id_fk,
  //       },
  //     }
  //   );
  //   await EventCategories.update(
  //     {
  //       used_numbers: sequelize.fn(
  //         "array_append",
  //         sequelize.col("used_numbers"),
  //         req.body.value
  //       ),
  //     },
  //     {
  //       where: {
  //         event_id_fk: req.body.user_info.event_id_fk,
  //         category_id_fk: req.body.user_info.category_id_fk,
  //       },
  //     }
  //   );
  //   await UsersCategories.update(
  //     { order: req.body.value },
  //     {
  //       where: {
  //         category_id_fk: req.body.user_info.category_id_fk,
  //         event_id_fk: req.body.user_info.event_id_fk,
  //         user_id_fk: req.body.user_info.user_id_fk,
  //       },
  //     }
  //   );
  // }
});

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
    res.json({ error: error });
  }
});
module.exports = router;
