module.exports = (sequelize, DataTypes) => {
  const Events = sequelize.define("Events", {
    event_id_pk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    event_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    event_location: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    event_date: {
      type: DataTypes.DATEONLY,
      allowNull: false,
    },
    event_status: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "SCHEDULED",
    },
  });

  return Events;
};
