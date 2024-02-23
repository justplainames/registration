module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define(
    "Scores",
    {
      score: {
        type: DataTypes.DECIMAL(3, 2),
        allowNull: false,
        default: 0,
      },
    },
    {
      primaryKey: true,
      uniqueKeys: {
        scores_pk: {
          fields: [
            "user_id_fk",
            "judge_id_fk",
            "category_id_fk",
            "event_id_fk",
          ],
        },
      },
    }
  );

  return Scores;
};
