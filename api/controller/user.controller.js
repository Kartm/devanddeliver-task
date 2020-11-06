const jwt = require("jsonwebtoken");
const crypto = require("crypto");

const randomInteger = require("../utils/randomInteger");
const idFromURIArray = require("../utils/idFromURIArray");
const db = require("../models");
const {
  getAllSwPeople,
  getSwPerson,
  getSwFilm,
  getSwSpecies,
  getSwStarship,
  getSwPlanet,
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
        const filmIds = idFromURIArray(data.films);

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
        const filmIds = idFromURIArray(data.films);

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
        message: err.message || "Some error occurred while retrieving film.",
      });
    });
};

exports.findSpecies = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const speciesIds = idFromURIArray(data.species);

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
        const speciesIds = idFromURIArray(data.species);

        if (!speciesIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this film!",
          });
        }

        getSwSpecies(id).then((species) => {
          res.status(200).send({
            species,
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

exports.findVehicles = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const vehicleIds = idFromURIArray(data.vehicles);

        Promise.all(vehicleIds.map((id) => getSwVehicle(id))).then((values) => {
          res.status(200).send({
            vehicles: values,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles.",
      });
    });
};

exports.findOneVehicle = (req, res) => {
  const id = req.params.id;

  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const vehicleIds = idFromURIArray(data.vehicles);

        if (!vehicleIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this vehicle!",
          });
        }

        getSwVehicle(id).then((vehicle) => {
          res.status(200).send({
            vehicle,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving vehicle.",
      });
    });
};

exports.findStarships = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const starshipIds = idFromURIArray(data.starships);

        Promise.all(starshipIds.map((id) => getSwStarship(id))).then(
          (values) => {
            res.status(200).send({
              starships: values,
            });
          }
        );
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving starships.",
      });
    });
};

exports.findOneStarship = (req, res) => {
  const id = req.params.id;

  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const starshipIds = idFromURIArray(data.starships);

        if (!starshipIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this starship!",
          });
        }

        getSwStarship(id).then((starship) => {
          res.status(200).send({
            starship,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving starship.",
      });
    });
};

exports.findPlanet = (req, res) => {
  User.findByPk(req.userId)
    .then((user) => {
      getSwPerson(user.swPeopleId).then((data) => {
        const planetId = idFromURIArray([data.homeworld])[0];

        getSwPlanet(planetId).then((planet) => {
          res.status(200).send({
            planet,
          });
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving planet.",
      });
    });
};
