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

// API endpoint to delete events
router.delete("/deleteEvent", async (req, res) => {
  try {
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
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

// API endpoint to get eventInfo
router.get("/getEventInfo/:eventId", async (req, res) => {
  try {
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

    res.json({
      event_info: event_info.dataValues,
      selection_data: present_categories,
      available_categories: available_categories,
      available_judges: available_judges,
    });
  } catch (error) {
    res.status(500).json({
      error: "Internal Server Error",
      message: error.message,
    });
  }
});

router.put("/editEventInfo/", async (req, res) => {
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
    const old_data = await EventCategories.findAll({
      where: {
        event_id_fk: event_info.event_id_pk,
      },
      raw: true,
    });

    let count = 0;
    old_data.forEach((old) => {
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
    count = 0;

    selected_data.map((new_data) => {
      count += 1;
      if (
        !old_data.find((old) => new_data.category_id_fk === old.category_id_fk)
      ) {
        categories_to_add.push(new_data);
      }
    });
    count = 0;
    // add new cats
    Promise.all(
      categories_to_add.map(async (cat) => {
        count += 1;
        await EventCategories.create({
          category_id_fk: cat.category_id_fk,
          event_id_fk: event_info.event_id_pk,
          num_of_judges: cat.judges.length,
        });
        let count_2 = 0;
        Promise.all(
          cat.judges.map(async (judge) => {
            count_2 += 1;
            await JudgesCategories.create({
              judge_id_fk: judge.judge_id_fk,
              category_id_fk: judge.category_id_fk,
              event_id_fk: judge.event_id_fk,
            });
          })
        );
      })
    );
    let count_3 = 0;

    // Delete Cats
    Promise.all(
      categories_to_delete.map(async (cat) => {
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
          count_6 += 1;
          if (
            !list_of_judges.find(
              (old) => new_data.judge_id_fk === old.judge_id_fk
            )
          ) {
            judges_to_add.push(new_data.judge_id_fk);
          }
        });

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
          // To delete Judges
          judges_to_delete.map(async (judge) => {
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
      })
    );

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ error: "Internal Server Error", message: error.message });
  }
});

module.exports = router;
