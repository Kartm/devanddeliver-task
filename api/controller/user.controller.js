const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const randomInteger = require("../utils/randomInteger");
const idFromURI = require("../utils/idFromURI");
const db = require("../models");
const {
  getAllSwPeople,
  getSwPerson,
  getSwFilm,
  getSwSpecies,
} = require("../services/swapi.service");
const User = db.users;

exports.register = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email and password cannot be empty.",
    });
    return;
  }

  const passwordHash = crypto
    .createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const allSwPeople = await getAllSwPeople();
  const swPeopleId = randomInteger(1, allSwPeople.count);

  const user = {
    email: req.body.email,
    passwordHash,
    swPeopleId,
  };

  User.create(user)
    .then((data) => {
      res.send({
        id: data.id,
        email: data.email,
        swPeopleId: data.swPeopleId,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
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
        return res.status(404).send({ message: "User not found." });
      }

      const passwordHash = crypto
        .createHash("sha256")
        .update(req.body.password)
        .digest("hex");

      var passwordIsValid = user.passwordHash === passwordHash;

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
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
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        res.status(200).send({
          id: user.id,
          email: user.email,
          person: data,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data.",
      });
    });
};

exports.findFilms = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const filmIds = idFromURI(data.films);

        Promise.all(filmIds.map((id) => getSwFilm(id))).then((values) => {
          res.status(200).send({
            films: values,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving films.",
      });
    });
};

exports.findOneFilm = (req, res) => {
  const id = req.params.id;

  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const filmIds = idFromURI(data.films);

        if (!filmIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this film!",
          });
        }

        getSwFilm(id).then((film) => {
          res.status(200).send({
            film,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving films.",
      });
    });
};

exports.findSpecies = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const speciesIds = idFromURI(data.species);

        Promise.all(speciesIds.map((id) => getSwSpecies(id))).then((values) => {
          res.status(200).send({
            species: values,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving species.",
      });
    });
};

exports.findOneSpecies = (req, res) => {
  const id = req.params.id;

  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const speciesIds = idFromURI(data.species);

        if (!speciesIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this film!",
          });
        }

        getSwSpecies(id).then((film) => {
          res.status(200).send({
            film,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving species.",
      });
    });
};
