import express, { Express } from "express";
import authenticateToken from "../middleware/authenticateToken";
import * as users from "../controller/user.controller";
import * as starwars from "../controller/starwars.controller";

export default (app: Express) => {
  const router = express.Router();

  router.post("/register", users.register);

  router.post("/login", users.login);

  router.get("/", authenticateToken, users.find);

  router.get("/films", authenticateToken, starwars.findFilms);

  router.get("/films/:id", authenticateToken, starwars.findOneFilm);

  router.get("/species", authenticateToken, starwars.findSpecies);

  router.get("/species/:id", authenticateToken, starwars.findOneSpecies);

  router.get("/vehicles", authenticateToken, starwars.findVehicles);

  router.get("/vehicles/:id", authenticateToken, starwars.findOneVehicle);

  router.get("/starships", authenticateToken, starwars.findStarships);

  router.get("/starships/:id", authenticateToken, starwars.findOneStarship);

  router.get("/planet", authenticateToken, starwars.findPlanet);

  app.use("/api/user", router);
};
