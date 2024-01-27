module.exports = (sequelize, DataTypes) => {
  const ParticipantsCategories = sequelize.define("ParticipantsCategories", {
    participant_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Participants",
        key: "participant_id_pk",
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
    events_id_fk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "Events",
        key: "event_id_pk",
      },
    },
  });

  return ParticipantsCategories;
};
