module.exports = (sequelize, DataTypes) => {
  const JudgesCategories = sequelize.define(
    "JudgesCategories",
    {
      event_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        // Add a foreign key constraint if necessary
        references: {
          model: "Events",
          key: "event_id_pk",
        },
      },
    },
    {
      primaryKey: true,
      uniqueKeys: {
        judges_categories_pk: {
          fields: ["judge_id_fk", "category_id_fk", "event_id_fk"],
        },
      },
    }
  );

  return JudgesCategories;
};
