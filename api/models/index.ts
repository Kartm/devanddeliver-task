import Sequelize from "sequelize";
import dbConfig from "../config/db.config";
import UserModel from "./user.model";

const sequelize = new (Sequelize as any)(
  dbConfig.database,
  dbConfig.user,
  dbConfig.password,
  {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,

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
  users: UserModel(sequelize, Sequelize),
};
