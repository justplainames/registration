module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
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
  });

  return Users;
};
