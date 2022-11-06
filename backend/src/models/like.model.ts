import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import LikeI from "../interfaces/like.interface";
import { Tables } from "../constants/tables.constant";
import Post from "./post.model";
import User from "./user.model";

interface LikeCreation extends Optional<LikeI, "id"> {}

interface LikeInstance extends Model<LikeI, LikeCreation>, LikeI {
  // createdAt?: Date;
  // updatedAt?: Date;
}

const Like = sequelize.define<LikeInstance>(
  Tables.likes,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
);

export default Like;
