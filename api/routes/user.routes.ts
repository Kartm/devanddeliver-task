import authenticateToken from "../middleware/authenticateToken";
import * as users from "../controller/user.controller";
import express, { Express } from "express";

export default (app: Express) => {
  const router = express.Router();

  router.post("/register", users.register);

  router.post("/login", users.login);

  router.get("/", authenticateToken, users.find);

  router.get("/films", authenticateToken, users.findFilms);

  router.get("/films/:id", authenticateToken, users.findOneFilm);

  router.get("/species", authenticateToken, users.findSpecies);

  router.get("/species/:id", authenticateToken, users.findOneSpecies);

  router.get("/vehicles", authenticateToken, users.findVehicles);

  router.get("/vehicles/:id", authenticateToken, users.findOneVehicle);

  router.get("/starships", authenticateToken, users.findStarships);

  router.get("/starships/:id", authenticateToken, users.findOneStarship);

  router.get("/planet", authenticateToken, users.findPlanet);

  app.use("/api/user", router);
};
