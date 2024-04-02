module.exports = (sequelize, DataTypes) => {
  const UsersCategories = sequelize.define(
    "UsersCategories",
    {
      user_id_fk: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
          model: "Users",
          key: "user_id_pk",
        },
      },
      category_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Categories",
          key: "category_id_pk",
        },
      },
      event_id_fk: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "Events",
          key: "event_id_pk",
        },
      },
      order: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_score: {
        type: DataTypes.DECIMAL(5, 2),
        allowNull: true,
      },
      stage_name: {
        type: DataTypes.STRING,
        allowNull: true,
      },
    },
    {
      primaryKey: true,
      uniqueKeys: {
        users_categories_pk: {
          fields: ["user_id_fk", "category_id_fk", "event_id_fk"],
        },
      },
    }
  );

  return UsersCategories;
};
