module.exports = (sequelize, DataTypes) => {
  const Values = sequelize.define("Values", {
    counts: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  
  return Values;
};
