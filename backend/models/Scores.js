module.exports = (sequelize, DataTypes) => {
  const Scores = sequelize.define("Scores", {
    score: {
      type: DataTypes.DECIMAL(3, 2),
      allowNull: false,
      default: 0,
    },
  });

  return Scores;
};
