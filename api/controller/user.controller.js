const jwt = require("jsonwebtoken");
const db = require("../models");
const Users = db.users;
const Op = db.Sequelize.Op;

function generateAccessToken(data) {
  // expires after half and hour (1800 seconds = 30 minutes)
  return jwt.sign(data, "SECRET", { expiresIn: "1800s" });
}

exports.register = (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
    return;
  }

  const token = generateAccessToken({ password: req.body.password });

  const user = {
    email: req.body.email,
    token: token,
  };

  Users.create(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial.",
      });
    });
};

exports.findAll = (req, res) => {
  const title = req.query.title;
  var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

  Users.findAll({ where: condition })
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving tutorials.",
      });
    });
};

exports.findOne = (req, res) => {
  const id = req.params.id;

  Users.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
