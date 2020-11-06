import fetch from "node-fetch";
import CacheService from "../services/cache.service";

const cache = new CacheService(60 * 60 * 24); // cache for 24 hours

export const getAllSwPeople = () =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });

export const getSwHero = (id) =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });

export const getSwFilm = (id) =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });

export const getSwSpecies = (id) =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });

export const getSwVehicle = (id) =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });

export const getSwStarship = (id) =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });

export const getSwPlanet = (id) =>
  new Promise((res) => {
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
      .then((j) => {
        res(j);
      });
  });
