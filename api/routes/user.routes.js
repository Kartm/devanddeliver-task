const authenticateToken = require("../middleware/authenticateToken.js");

module.exports = (app) => {
  const users = require("../controller/user.controller.js");

  var router = require("express").Router();

  router.post("/register", users.register);

  router.post("/login", users.login);

  router.get("/", authenticateToken, users.find);

  // router.get("/:id", users.findOne);

  app.use("/api/user", router);
};
