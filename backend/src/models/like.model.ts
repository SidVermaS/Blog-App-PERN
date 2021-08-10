import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import LikeI from '../interfaces/like.interface'
import {usersC, postsC, likes} from '../constants/tables.constant'
import Post from './post.model'
import User from './user.model'

interface LikeCreation extends Optional<LikeI, 'id'> {}

interface LikeInstance extends Model<LikeI, LikeCreation>, LikeI {
  // createdAt?: Date;
  // updatedAt?: Date;
}

const Like=sequelize.define<LikeInstance>(
  likes,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    post_id: {
      type: DataTypes.UUID,
      allowNull: false,
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

// Like.belongsTo(Post, {
//   foreignKey: 'post_id', 
//   targetKey: 'id',
// })
// Post.hasOne(Like, {
//   foreignKey: 'post_id',
// })

// Like.belongsTo(User, {
//   foreignKey: 'user_id', 
//   targetKey: 'id',
// })
// User.hasOne(Like, {
//   foreignKey: 'user_id',
// })

export default Like