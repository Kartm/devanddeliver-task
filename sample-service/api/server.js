const express = require("express");
const bodyParser = require("body-parser");

const app = express();

// parse requests of content-type - application/json
app.use(bodyParser.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// call sysc()
const db = require("./models");
db.sequelize.sync();

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to bogo node application." });
});

// tutorial routes
require("./routes/tutorial.routes.js")(app);

// set port, listen for requests
const PORT = 8123;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

// todo
/*
Authorization: email & password
Assign random hero to this new user
Endpoints:
/films
/species
/vehicles
/starships
/planets

Authorization used in:
/resource/{id}

Caching: 24hrs
*/
