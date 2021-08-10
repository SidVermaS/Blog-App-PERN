import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import PostI from '../interfaces/post.interface'
import {usersC, postsC, comments, likes,} from '../constants/tables.constant'
import Comments from './comment.model'
import Like from './like.model'
import User from './user.model'

interface PostCreation extends Optional<PostI, 'id'> {}

interface PostInstance extends Model<PostI, PostCreation>, PostI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Post=sequelize.define<PostInstance>(
  postsC,
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
    likes_count: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    }
  },  
  {
    timestamps: false,
    createdAt: false,
    updatedAt: false,
  }
)
// Post.belongsTo(User, {
//   foreignKey: 'user_id',
//   targetKey: 'id',
// })
// User.hasOne(Post, {
//   foreignKey: 'user_id',
// })

// Like.belongsTo(Post, {
//   foreignKey: 'post_id', 
//   targetKey: 'id',
// })
// Post.hasOne(Like, {
//   foreignKey: 'post_id',
// })

// Comments.belongsTo(Post, {
//   foreignKey: 'post_id',
//   as: postsC
// })
// Post.hasMany(Comments, {
//   sourceKey: 'id',
//   foreignKey: 'post_id',
//   as: comments
// })

export default Post