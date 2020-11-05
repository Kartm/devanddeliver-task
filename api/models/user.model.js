module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    token: {
      type: Sequelize.STRING,
    },
  });

  return User;
};
