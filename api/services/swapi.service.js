const CacheService = require("../services/cache.service");
const cache = new CacheService(60 * 60 * 24); // cache for 24 hours
const fetch = require("node-fetch");

exports.getAllSwPeople = () =>
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

exports.getSwHero = (id) =>
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

exports.getSwFilm = (id) =>
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

exports.getSwSpecies = (id) =>
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

exports.getSwVehicle = (id) =>
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

exports.getSwStarship = (id) =>
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

exports.getSwPlanet = (id) =>
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
