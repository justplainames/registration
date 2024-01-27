module.exports = (sequelize, DataTypes) => {
  const EventCategory = sequelize.define(
    "EventCategories",
    {
      num_of_judges: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      primaryKey: true,
      uniqueKeys: {
        event_categories_pk: {
          fields: ["event_id_fk", "category_id_fk"],
        },
      },
    }
  );

  return EventCategory;
};
