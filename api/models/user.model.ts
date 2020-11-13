import * as Sequelize from "sequelize";
import { BuildOptions, Model } from "sequelize";

export interface UserAttributes {
  id?: number;
  email: string;
  passwordHash: string;
  swHeroId: number;
}

export interface UserModel extends Model<UserAttributes>, UserAttributes {}

export class User extends Model<UserModel, UserAttributes> {
  id?: number;
  email: string;
  passwordHash: string;
  swHeroId: number;
}

export type UserStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UserModel;
};

export function UserFactory(sequelize: Sequelize.Sequelize): UserStatic {
  return <UserStatic>sequelize.define("user", {
    email: {
      type: Sequelize.STRING,
    },
    passwordHash: {
      type: Sequelize.STRING,
    },
    swHeroId: {
      type: Sequelize.INTEGER,
    },
  });
}
