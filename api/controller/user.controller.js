const jwt = require("jsonwebtoken");
const crypto = require("crypto");
let fetch = require("node-fetch");
const db = require("../models");
const User = db.users;
const Op = db.Sequelize.Op;

function randomInteger(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function randomSwPeopleId() {
  return new Promise((resolve) => {
    fetch("https://swapi.dev/api/people/", {
      method: "GET",
      headers: { "Content-Type": "application/json" },
    })
      .then(async (response) => {
        response.json().then((j) => {
          resolve(randomInteger(1, j.count));
        });
      })
      .catch((err) => {
        console.log(err);
      });
  });
}

exports.register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Content can not be empty.",
    });
    return;
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const user = {
    email: req.body.email,
    passwordHash,
    swPeopleId: await randomSwPeopleId(),
  };

  User.create(user)
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

exports.login = (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      const passwordHash = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

      var passwordIsValid = user.passwordHash === passwordHash;

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      var token = jwt.sign({ userId: user.id }, "SECRET", {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        swPeopleId: user.swPeopleId,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
};

exports.find = (req, res) => {
  // var condition = req.userId ? { id: { [Op.like]: `%${req.userId}%` } } : null;
  // todo check if not undefined

  User.findByPk(req.userId)
    .then((user) => {
      fetch(`https://swapi.dev/api/people/${user.swPeopleId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      })
        .then(async (response) => {
          response.json().then((j) => {
            res.status(200).send({
              id: user.id,
              email: user.email,
              people: j,
            });
          });
        })
        .catch((err) => {
          console.log(err);
        });
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

  User.findByPk(id)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error retrieving Tutorial with id=" + id,
      });
    });
};
