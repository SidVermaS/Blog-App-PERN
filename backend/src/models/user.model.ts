import { DataTypes, Model, Optional } from "sequelize";
import bcrypt from "bcrypt";
import { sequelize } from ".";
import UserI from "../interfaces/user.interface";
import {
  Tables,
} from "../constants/tables.constant";
import Post from "./post.model";
import Comments from "./comment.model";
import Like from "./like.model";

interface UserCreation extends Optional<UserI, "id"> {}

interface UserInstance extends Model<UserI, UserCreation>, UserI {
  // createdAt?: Date;
  // updatedAt?: Date;
}

const User = sequelize.define<UserInstance>(
  Tables.users,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    public_user_id: {
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    phone: {
      allowNull: false,
      unique: true,
      type: DataTypes.BIGINT,
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING,
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
  },
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
    hooks: {
      beforeCreate: async (user: any, options) => {
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);
      },
    },
  }
);
User.prototype.validPassword = async function (password: string) {
  return await bcrypt.compare(password, this.password);
};
User.hasOne(Like, {
  as: "like",
  foreignKey: "user_id",
});
Like.belongsTo(User);

// Post.belongsTo(User, {
//   foreignKey: 'user_id',
//   targetKey: 'id',
// })
// User.hasOne(Post, {
//   foreignKey: 'user_id',
// })

// Comments.belongsTo(User, {
//   foreignKey: 'user_id',
//   as: Tables.users
// })
// User.hasMany(Comments, {
//   sourceKey: 'id',
//   foreignKey: 'user_id',
//   as: commentsC
// })

export default User;
