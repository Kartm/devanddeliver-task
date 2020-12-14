import { Response } from "express";
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
import { User } from "../models/user/user.model";
import {
  RegisterUserDTO,
  LoginUserDTO,
  UserFindDTO,
  FilmsDTO,
  FilmSingleDTO,
  SpeciesDTO,
  SpeciesSingleDTO,
  VehiclesDTO,
  VehicleSingleDTO,
  StarshipSingleDTO,
  StarshipsDTO,
  PlanetSingleDTO,
} from "../models/user/user.dto";
import { ErrorMessageDTO, ErrorMessageWithTokenDTO } from "../models/api.dto";

export async function register(req: RequestWithMetaData, res: Response) {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Email and password cannot be empty.",
    } as ErrorMessageDTO);
    return;
  }

  await db.users
    .findOne({
      where: {
        email: req.body.email,
      },
    })
    .then(async (user: User) => {
      if (user) {
        res.status(400).send({ message: "Email already in use." });
        return;
      }
    })
    .catch((err) => {
      res.status(500).send({ message: err.message } as ErrorMessageDTO);
    });

  const passwordHash = NodeCrypto.createHash("sha256")
    .update(req.body.password)
    .digest("hex");

  const allSwPeople = await getAllSwPeople();
  const swHeroId = randomInteger(1, allSwPeople.count);

  const newUser = {
    email: req.body.email,
    passwordHash,
    swHeroId,
  };

  await db.users
    .create(newUser)
    .then((user: User) => {
      res.status(201).send({
        id: user.id,
        email: user.email,
        swHeroId: user.swHeroId,
      } as RegisterUserDTO);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user.",
      } as ErrorMessageDTO);
    });
}

export async function login(req: RequestWithMetaData, res: Response) {
  await db.users
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

      const passwordIsValid = user.passwordHash === passwordHash;

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid password!",
        } as ErrorMessageWithTokenDTO);
      }

      const token = jwt.sign({ userId: user.id }, "SECRET", {
        expiresIn: 86400, // 24 hours
      });

      res.status(200).send({
        id: user.id,
        email: user.email,
        swHeroId: user.swHeroId,
        accessToken: token,
      } as LoginUserDTO);
    })
    .catch((err) => {
      res.status(500).send({ message: err.message } as ErrorMessageDTO);
    });
}

export async function find(req: RequestWithMetaData, res: Response) {
  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        res.status(200).send({
          id: user.id,
          email: user.email,
          hero: data,
        } as UserFindDTO);
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving user data.",
      } as ErrorMessageDTO);
    });
}

export async function findFilms(req: RequestWithMetaData, res: Response) {
  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const filmIds = idFromURIArray(data.films);

        Promise.all(filmIds.map((id) => getSwFilm(id))).then((values) => {
          res.status(200).send({
            films: values,
          } as FilmsDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving films.",
      } as ErrorMessageDTO);
    });
}

export async function findOneFilm(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const filmIds = idFromURIArray(data.films);

        if (!filmIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this film!",
          } as ErrorMessageDTO);
        }

        getSwFilm(id).then((film) => {
          res.status(200).send({
            film,
          } as FilmSingleDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving film.",
      } as ErrorMessageDTO);
    });
}

export async function findSpecies(req: RequestWithMetaData, res: Response) {
  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const speciesIds = idFromURIArray(data.species);

        Promise.all(speciesIds.map((id) => getSwSpecies(id))).then((values) => {
          res.status(200).send({
            species: values,
          } as SpeciesDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving species.",
      } as ErrorMessageDTO);
    });
}

export async function findOneSpecies(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const speciesIds = idFromURIArray(data.species);

        if (!speciesIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this species!",
          } as ErrorMessageDTO);
        }

        getSwSpecies(id).then((species) => {
          res.status(200).send({
            species,
          } as SpeciesSingleDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving species.",
      } as ErrorMessageDTO);
    });
}

export async function findVehicles(req: RequestWithMetaData, res: Response) {
  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const vehicleIds = idFromURIArray(data.vehicles);

        Promise.all(vehicleIds.map((id) => getSwVehicle(id))).then((values) => {
          res.status(200).send({
            vehicles: values,
          } as VehiclesDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving vehicles.",
      } as ErrorMessageDTO);
    });
}

export async function findOneVehicle(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const vehicleIds = idFromURIArray(data.vehicles);

        if (!vehicleIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this vehicle!",
          } as ErrorMessageDTO);
        }

        getSwVehicle(id).then((vehicle) => {
          res.status(200).send({
            vehicle,
          } as VehicleSingleDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving vehicle.",
      } as ErrorMessageDTO);
    });
}

export async function findStarships(req: RequestWithMetaData, res: Response) {
  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const starshipIds = idFromURIArray(data.starships);

        Promise.all(starshipIds.map((id) => getSwStarship(id))).then(
          (values) => {
            res.status(200).send({
              starships: values,
            } as StarshipsDTO);
          }
        );
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving starships.",
      } as ErrorMessageDTO);
    });
}

export async function findOneStarship(req: RequestWithMetaData, res: Response) {
  const id = parseInt(req.params.id);

  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const starshipIds = idFromURIArray(data.starships);

        if (!starshipIds.includes(id)) {
          return res.status(403).send({
            message: "No access to this starship!",
          } as ErrorMessageDTO);
        }

        getSwStarship(id).then((starship) => {
          res.status(200).send({
            starship,
          } as StarshipSingleDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving starship.",
      } as ErrorMessageDTO);
    });
}

export async function findPlanet(req: RequestWithMetaData, res: Response) {
  await db.users
    .findByPk(req.userId)
    .then((user: User) => {
      getSwHero(user.swHeroId).then((data) => {
        const planetId = idFromURIArray([data.homeworld])[0];

        getSwPlanet(planetId).then((planet) => {
          res.status(200).send({
            planet,
          } as PlanetSingleDTO);
        });
      });
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving planet.",
      } as ErrorMessageDTO);
    });
}
