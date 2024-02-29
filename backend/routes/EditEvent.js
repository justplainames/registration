const express = require("express");
const router = express.Router();
const moment = require("moment");
const {
  Events,
  Categories,
  Judges,
  JudgesCategories,
  EventCategories,
  Scores,
  UsersCategories,
} = require("../models");

router.delete("/deleteEvent", async (req, res) => {
  const event_id_pk = req.body.event_id_pk;

  await UsersCategories.destroy({
    where: { event_id_fk: event_id_pk },
  });
  await EventCategories.destroy({
    where: { event_id_fk: event_id_pk },
  });
  await JudgesCategories.destroy({
    where: { event_id_fk: event_id_pk },
  });
  await Scores.destroy({
    where: { event_id_fk: event_id_pk },
  });
  await Events.destroy({
    where: { event_id_pk: event_id_pk },
  });
  res.json("ok");
});
router.get("/getEventInfo/:eventId", async (req, res) => {
  const event_id_pk = req.params.eventId;
  const event_info = await Events.findByPk(event_id_pk);

  const present_categories = await EventCategories.findAll({
    where: {
      event_id_fk: event_id_pk,
    },
    attributes: ["category_id_fk", "event_id_fk"],
    include: [
      {
        model: Categories,
        attributes: ["category_name"],
      },
    ],

    raw: true,
  });

  await Promise.all(
    present_categories.map(async (category) => {
      const judges = await JudgesCategories.findAll({
        where: {
          category_id_fk: category.category_id_fk,
          event_id_fk: category.event_id_fk,
        },
        raw: true,
        include: [
          {
            model: Judges,
            attributes: ["judge_name"],
          },
        ],
      });
      category.judges = judges;
    })
  );

  const available_categories = await Categories.findAll({
    attributes: ["category_id_pk", "category_name"],
    raw: true,
  });
  const available_judges = await Judges.findAll({
    attributes: ["judge_id_pk", "judge_name"],
    raw: true,
  });

  console.log("Event Info = ", event_info.dataValues);
  console.log("Present Categories = ", present_categories);
  // console.log("added Judges = ", added_judges);
  res.json({
    event_info: event_info.dataValues,
    selection_data: present_categories,
    available_categories: available_categories,
    available_judges: available_judges,
  });
});

router.put("/editEventInfo/", async (req, res) => {
  console.log("Entered Route");
  const data = req.body;
  const event_info = data.event_info;
  const selected_data = data.selected_data;
  const categories_to_delete = [];
  const categories_to_add = [];
  const categories_to_keep = [];

  try {
    await Events.update(
      {
        event_name: event_info.event_name,
        event_description: event_info.event_description,
        event_location: event_info.event_location,
        event_data: moment(event_info.event_date, "DD/MM/YYYY").toDate(),
      },
      {
        where: {
          event_id_pk: event_info.event_id_pk,
        },
      }
    );
    console.log("Created variables");
    console.log("PRE Await EventCategories.findAll");
    const old_data = await EventCategories.findAll({
      where: {
        event_id_fk: event_info.event_id_pk,
      },
      raw: true,
    });
    console.log("POST Await EventCategories.findAll", old_data);

    let count = 0;
    old_data.forEach((old) => {
      console.log("old_data for each - ", count);
      count += 1;
      const found = selected_data.find(
        (new_data) => new_data.category_id_fk === old.category_id_fk
      );

      if (!found) {
        categories_to_delete.push(old);
      } else {
        categories_to_keep.push(found); // Push the matching 'new_data' to 'categories_to_keep'
      }
    });
    console.log("old_data.forEach Completed");
    count = 0;

    selected_data.map((new_data) => {
      console.log("selected_data.map ", count);
      count += 1;
      if (
        !old_data.find((old) => new_data.category_id_fk === old.category_id_fk)
      ) {
        categories_to_add.push(new_data);
      }
    });
    console.log("selected_data.map Completed");
    count = 0;
    // add new cats
    Promise.all(
      categories_to_add.map(async (cat) => {
        console.log("Entered Iteration of Categories_to_add - ", count);
        count += 1;
        await EventCategories.create({
          category_id_fk: cat.category_id_fk,
          event_id_fk: event_info.event_id_pk,
          num_of_judges: cat.judges.length,
        });
        let count_2 = 0;
        Promise.all(
          cat.judges.map(async (judge) => {
            console.log("judge", judge);
            console.log("Entered Iteration of Cat.judges.map - ", count_2);
            count_2 += 1;
            await JudgesCategories.create({
              judge_id_fk: judge.judge_id_fk,
              category_id_fk: judge.category_id_fk,
              event_id_fk: judge.event_id_fk,
            });
          })
        );
        console.log("Line Iteration of Cat.judges.map - ", count_2);
      })
    );
    let count_3 = 0;
    // Delete Cats
    Promise.all(
      categories_to_delete.map(async (cat) => {
        console.log("Entered Iteration of Categories_to_delete - ", count_3);
        count_3 += 1;
        await EventCategories.destroy({
          where: {
            category_id_fk: cat.category_id_fk,
            event_id_fk: event_info.event_id_pk,
          },
        });
        await JudgesCategories.destroy({
          where: {
            category_id_fk: cat.category_id_fk,
            event_id_fk: event_info.event_id_pk,
          },
        });
        await Scores.destroy({
          where: {
            category_id_fk: cat.category_id_fk,
            event_id_fk: event_info.event_id_pk,
          },
        });

        await UsersCategories.destroy({
          where: {
            category_id_fk: cat.category_id_fk,
            event_id_fk: event_info.event_id_pk,
          },
        });
      })
    );
    let count_4 = 0;
    // Modify Current
    Promise.all(
      categories_to_keep.map(async (cat) => {
        console.log("Entered Iteration of Categories_to_keep - ", count_4);
        count_4 += 1;
        // Get Old Data
        const list_of_judges = await JudgesCategories.findAll({
          where: {
            category_id_fk: cat.category_id_fk,
            event_id_fk: event_info.event_id_pk,
          },
          attributes: ["judge_id_fk"],
          raw: true,
        });

        const list_of_new_judges = cat.judges;

        const judges_to_add = [];
        const judges_to_delete = [];

        let count_5 = 0;
        list_of_judges.forEach((old) => {
          console.log("Entered Iteration of list_of judges - ", count_5);
          count_5 += 1;
          if (
            !list_of_new_judges.find(
              (new_data) => new_data.judge_id_fk === old.judge_id_fk
            )
          ) {
            judges_to_delete.push(old.judge_id_fk);
          }
        });
        let count_6 = 0;
        list_of_new_judges.forEach((new_data) => {
          console.log("Entered Iteration of list_of_new_judges - ", count_6);
          count_6 += 1;
          if (
            !list_of_judges.find(
              (old) => new_data.judge_id_fk === old.judge_id_fk
            )
          ) {
            judges_to_add.push(new_data.judge_id_fk);
          }
        });

        console.log(judges_to_add, judges_to_delete);

        // To add judges
        if (judges_to_add.length !== 0) {
          judges_to_add.map(async (judge) => {
            await JudgesCategories.create({
              judge_id_fk: judge,
              category_id_fk: cat.category_id_fk,
              event_id_fk: event_info.event_id_pk,
            });
          });
        }

        if (judges_to_delete.length !== 0) {
          console.log("ASDKLHASKLDJHASLKJDHAKLSJDHKLASJDHJKLSDHJKLS\n\n\n");

          // To delete Judges
          judges_to_delete.map(async (judge) => {
            console.log("JUDGE =", judge);
            await JudgesCategories.destroy({
              where: {
                judge_id_fk: judge,
                category_id_fk: cat.category_id_fk,
                event_id_fk: event_info.event_id_pk,
              },
            });

            await Scores.destroy({
              where: {
                judge_id_fk: judge,
                category_id_fk: cat.category_id_fk,
                event_id_fk: event_info.event_id_pk,
              },
            });
          });
        }

        // selected_data.map((new_data) => {
        //   if (
        //     !old_data.find(
        //       (old) => new_data.category_id_fk === old.category_id_fk
        //     )
        //   ) {
        //     categories_to_add.push(new_data);
        //   }
        // });

        // console.log(list_of_judges);
        // console.log(cat);
      })
    );

    // console.log(old_data);
    // console.log(selected_data);
    // console.log(categories_to_delete);
    // console.log(categories_to_add);
    // console.log(categories_to_keep);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "An internal server error occurred." });
  }
});

// router.get("/getCategories", async (req, res) => {
//   const categories = await Categories.findAll();
//   const data = categories.map((category) => {
//     return {
//       value: {
//         category_name: JSON.stringify(category.category_name),
//         category_id_pk: JSON.stringify(category.category_id_pk),
//       },
//       label: JSON.stringify(category.category_name),
//     };
//   });
//   res.json(data);
// });

// router.get("/getJudges", async (req, res) => {
//   const judges = await Judges.findAll();
//   const data = judges.map((judge) => {
//     return {
//       value: {
//         judge_name: JSON.stringify(judge.judge_name),
//         judge_id_pk: JSON.stringify(judge.judge_id_pk),
//       },
//       label: JSON.stringify(judge.judge_name),
//     };
//   });
//   res.json(data);
// });

// router.post("/updateEvent", async (req, res) => {
//   const content = req.body;
//   const event = {
//     event_name: content.event_name,
//     event_date: moment(content.event_date, "DD/MM/YYYY").toDate(),
//     event_description: content.event_description,
//     event_location: content.event_location,
//   };

//   const createdEvent = await Events.create(event, {
//     returning: ["event_id_pk"],
//   });

//   const parsedData = JSON.parse(content.event_information);
//   const finalData = Object.entries(parsedData);

//   const eventId = createdEvent.event_id_pk;

//   for (const [key, value] of finalData) {
//     await EventCategories.create({
//       event_id_fk: eventId,
//       category_id_fk: key,
//       num_of_judges: value.length,
//     });
//   }

//   for (const [key, value] of finalData) {
//     for (const judge of value) {
//       await JudgesCategories.create({
//         event_id_fk: eventId,
//         category_id_fk: key,
//         judge_id_fk: judge.value.judge_id_pk,
//       });
//     }
//   }

//   res.json("ok");
// });

// router.post("/updateJudgesCategories", async (req, res) => {
//   const content = req.body;
//   Object.entries(content).forEach(([key, value]) => {
//     console.log(key);
//     value.map(async (item) => {
//       await JudgesCategories.create({
//         judge_id_fk: item.value.judge_id_pk,
//         category_id_fk: key,
//       });
//     });
//   });

//   res.json("ok");
// });

module.exports = router;
