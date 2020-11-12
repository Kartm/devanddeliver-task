import express, { Response } from "express";
import NodeCrypto from "crypto";
import jwt from "jsonwebtoken";
import randomInteger from "../utils/randomInteger";
import idFromURIArray from "../utils/idsFromMultipleURI";
import db from "../models";
import {
  getAllSwPeople,
  getSwHero,
  getSwFilm,
  getSwSpecies,
  getSwVehicle,
  getSwStarship,
  getSwPlanet,
} from "../services/swapi.service";
import { RequestWithMetaData } from "../middleware/authenticateToken";
import { User } from "../models/user.model";

export async function register(req: RequestWithMetaData, res: Response) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email and password cannot be empty.",
    });
    return;
  }

  const passwordHash = NodeCrypto.createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const allSwPeople: any = await getAllSwPeople();
  const swHeroId = randomInteger(1, allSwPeople.count);

  const newUser = {
    email: req.body.email,
    passwordHash,
    swHeroId,
  };

  db.users
    .create(newUser)
    .then((user: User) => {
      res.send({
        id: user.id,
        email: user.email,
        swHeroId: user.swHeroId,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      });
    });
}

export async function login(req: RequestWithMetaData, res: Response) {
  db.users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then((user: User) => {
      if (!user) {
        return res.status(404).send({ message: "User not found." });
      }

      const passwordHash = NodeCrypto.createHash("sha256")
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
        swHeroId: user.swHeroId,
        accessToken: token,
      });
    })
    .catch((err) => {
      res.status(500).send({ message: err.message });
    });
}

export async function find(req: RequestWithMetaData, res: Response) {
  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        res.status(200).send({
          id: user.id,
          email: user.email,
          hero: data,
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data.",
      });
    });
}

export async function findFilms(req: RequestWithMetaData, res: Response) {
  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findOneFilm(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findSpecies(req: RequestWithMetaData, res: Response) {
  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findOneSpecies(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const speciesIds = idFromURIArray(data.species);

        if (!speciesIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this species!",
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
}

export async function findVehicles(req: RequestWithMetaData, res: Response) {
  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findOneVehicle(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findStarships(req: RequestWithMetaData, res: Response) {
  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findOneStarship(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}

export async function findPlanet(req: RequestWithMetaData, res: Response) {
  db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
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
}
