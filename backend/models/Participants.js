module.exports = (sequelize, DataTypes) => {
  const Participants = sequelize.define("Participants", {
    participant_id_pk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },

    participant_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    participant_instagram: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    participant_phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    participant_email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    participant_paid: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  });

  return Participants;
};
