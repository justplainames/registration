module.exports = (sequelize, DataTypes) => {
  const Judges = sequelize.define("Judges", {
    judge_id_pk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    judge_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Judges;
};
