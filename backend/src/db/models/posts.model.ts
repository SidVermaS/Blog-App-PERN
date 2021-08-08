import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import PostsI from '../../interfaces/posts.interface'
import {users, posts, comments, likes,} from '../../constants/tables.constant'
import Users from './users.model'
import Comments from './comments.model'
import Likes from './likes.model'

interface PostsCreation extends Optional<PostsI, 'id'> {}

interface PostsInstance extends Model<PostsI, PostsCreation>, PostsI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Posts=sequelize.define<PostsInstance>(
  posts,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
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
    likes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  }
)
Posts.belongsTo(Users, {
  foreignKey: 'user_id',
  as: users
})
Posts.hasMany(Comments, {
  sourceKey: 'id',
  foreignKey: 'post_id',
  as: comments
})
Posts.hasMany(Likes, {
  sourceKey: 'id',
  foreignKey: 'post_id',
  as: likes
})
export default Posts