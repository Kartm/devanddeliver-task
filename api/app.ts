const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bogo node application." });
});

require("./routes/user.routes.js")(app);

const PORT = process.env.PORT || 8123;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
