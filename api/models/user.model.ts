import * as Sequelize from "sequelize";
import { Model } from "sequelize";
import test from "./index";

export class User extends Model {
  id?: number | string;
  email: string;
  passwordHash: string;
  swHeroId: number;
}

export const users = User.init(
  {
    email: {
      type: Sequelize.STRING,
    },
    passwordHash: {
      type: Sequelize.STRING,
    },
    swHeroId: {
      type: Sequelize.INTEGER,
    },
  },
  {
    tableName: "user",
    sequelize: test.sequelize,
  }
);
