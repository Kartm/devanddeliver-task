import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

const app = express();

import db from "./models";
import routes from "./routes/user.routes";

const corsOptions = {
  origin: "http://localhost:8081",
};

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

db.sequelize.sync();

app.get("/", (req, res) => {
  res.json({ message: "Welcome to bogo node application." });
});

routes(app);

const PORT = process.env.PORT || 8123;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
