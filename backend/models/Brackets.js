module.exports = (sequelize, DataTypes) => {
  const Brackets = sequelize.define("Brackets", {
    bracket_id_pk: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
    },
    bracket_data: {
      type: DataTypes.JSONB,
      allowNull: true,
    },
  });

  return Brackets;
};
