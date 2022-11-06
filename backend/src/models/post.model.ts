import { DataTypes, Model, Optional } from "sequelize";
import { sequelize } from ".";
import PostI from "../interfaces/post.interface";
import { Tables } from "../constants/tables.constant";
import Comments from "./comment.model";
import Like from "./like.model";
import User from "./user.model";

interface PostCreation extends Optional<PostI, "id"> {}

interface PostInstance extends Model<PostI, PostCreation>, PostI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Post = sequelize.define<PostInstance>(
  Tables.posts,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    caption: {
      type: DataTypes.TEXT,
    },
    photo_url: {
      type: DataTypes.STRING,
    },
    likes_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
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
Post.hasOne(User, {
  as: "user",
  foreignKey: "user_id",
});
User.belongsTo(Post);

Post.hasOne(Like, {
  foreignKey: "post_id",
});
Like.belongsTo(Post);

// Comments.belongsTo(Post, {
//   foreignKey: 'post_id',
//   as: Tables.posts
// })
// Post.hasMany(Comments, {
//   sourceKey: 'id',
//   foreignKey: 'post_id',
//   as: comments
// })

export default Post;
