import * as Sequelize from "sequelize";
import { Model } from "sequelize";

interface UserAttributes {
  email: string;
  passwordHash: string;
  swHeroId: number;
}

interface UserCreateAttributes extends UserAttributes {}

class User
  extends Model<UserAttributes, UserCreateAttributes>
  implements UserAttributes {
  email: string;
  passwordHash: string;
  swHeroId: number;
}

export default (sequelize: Sequelize.Sequelize) => {
  const user = User.init(
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
      sequelize, // passing the `sequelize` instance is required
    }
  );

  return user;
};
