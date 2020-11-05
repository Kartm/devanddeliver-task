module.exports = (sequelize, Sequelize) => {
  const User = sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    passwordHash: {
      type: Sequelize.STRING,
    },
    swPeopleId: {
      type: Sequelize.INTEGER,
    },
  });

  return User;
};
