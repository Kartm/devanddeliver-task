// this file contains all DTOs used in user controller

import Film from "../swapi/Film.model";
import People from "../swapi/People.model";
import Planet from "../swapi/Planet.model";
import Species from "../swapi/Species.model";
import Starship from "../swapi/Starship.model";
import Vehicle from "../swapi/Vehicle.model";

export interface RegisterUserDTO {
  id: number;
  email: string;
  swHeroId: number;
}

export interface LoginUserDTO {
  id: number;
  email: string;
  swHeroId: number;
  accessToken: string;
}

export interface UserFindDTO {
  id: number;
  email: string;
  hero: People;
}

export interface FilmsDTO {
  films: Film[];
}

export interface FilmSingleDTO {
  film: Film;
}

export interface SpeciesDTO {
  species: Species[];
}

export interface SpeciesSingleDTO {
  species: Species;
}

export interface VehiclesDTO {
  vehicles: Vehicle[];
}

export interface VehicleSingleDTO {
  vehicle: Vehicle;
}

export interface StarshipsDTO {
  starships: Starship[];
}

export interface StarshipSingleDTO {
  starship: Starship;
}

export interface PlanetSingleDTO {
  planet: Planet;
}
