import fetch from "node-fetch";
import Film from "../models/swapi/Film.model";
import People from "../models/swapi/People.model";
import Planet from "../models/swapi/Planet.model";
import Results from "../models/swapi/Results.model";
import Species from "../models/swapi/Species.model";
import Starship from "../models/swapi/Starship.model";
import Vehicle from "../models/swapi/Vehicle.model";
import CacheService from "../services/cache.service";

const cache = new CacheService(60 * 60 * 24); // cache for 24 hours

export const getAllSwPeople = () =>
  new Promise<Results<People>>((res) => {
    const cacheKey = `people_all`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/people/`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: Results<People>) => {
        res(data);
      });
  });

export const getSwHero = (id: number) =>
  new Promise<People>((res) => {
    const cacheKey = `people_${id}`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/people/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: People) => {
        res(data);
      });
  });

export const getSwFilm = (id: number) =>
  new Promise<Film>((res) => {
    const cacheKey = `film_${id}`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/films/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: Film) => {
        res(data);
      });
  });

export const getSwSpecies = (id: number) =>
  new Promise<Species>((res) => {
    const cacheKey = `species_${id}`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/species/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: Species) => {
        res(data);
      });
  });

export const getSwVehicle = (id: number) =>
  new Promise<Vehicle>((res) => {
    const cacheKey = `vehicle_${id}`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/vehicles/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: Vehicle) => {
        res(data);
      });
  });

export const getSwStarship = (id: number) =>
  new Promise<Starship>((res) => {
    const cacheKey = `starship_${id}`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/starships/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: Starship) => {
        res(data);
      });
  });

export const getSwPlanet = (id: number) =>
  new Promise<Planet>((res) => {
    const cacheKey = `planet_${id}`;

    return cache
      .get(cacheKey, () =>
        fetch(`https://swapi.dev/api/planets/${id}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }).then(async (response) => {
          return await response.json();
        })
      )
      .then((data: Planet) => {
        res(data);
      });
  });
