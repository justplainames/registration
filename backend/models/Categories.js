module.exports = (sequelize, DataTypes) => {
  const Categories = sequelize.define("Categories", {
    category_id_pk: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    category_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Categories;
};
