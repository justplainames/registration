module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define(
    "Users",
    {
      user_id_pk: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true,
      },

      user_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      user_instagram: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      user_phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
      },

      user_email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      user_role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "user",
      },
      user_stage_name: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          if (user.user_stage_name === null) {
            user.user_stage_name = user.user_name; // Set user_stage_name to user_name if it's null
          }
        },
      },
    }
  );

  return Users;
};
