import { Response } from "express";
import NodeCrypto from "crypto";
import jwt from "jsonwebtoken";
import randomInteger from "../utils/randomInteger";
import db from "../models";
import { getAllSwPeople, getSwHero } from "../services/swapi.service";
import { RequestWithMetaData } from "../middleware/authenticateToken";
import { User } from "../models/user/user.model";
import {
  RegisterUserDTO,
  LoginUserDTO,
  UserFindDTO,
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
