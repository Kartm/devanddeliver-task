import * as Sequelize from "sequelize";
import dbConfig from "../config/db.config";
import { UserFactory } from "./user/user.model";

export const sequelize = new Sequelize.Sequelize(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: "mysql",
    pool: {
      max: dbConfig.pool.max,
      min: dbConfig.pool.min,
      acquire: dbConfig.pool.acquire,
      idle: dbConfig.pool.idle,
    },
  }
);

export default {
  Sequelize,
  sequelize,
  users: UserFactory(sequelize),
};
