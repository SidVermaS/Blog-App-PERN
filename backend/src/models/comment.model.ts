import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import CommentI from '../interfaces/comment.interface'
import {usersC, postsC, comments} from '../constants/tables.constant'
import Users from './user.model'
import Posts from './post.model'

interface CommentCreation extends Optional<CommentI, 'id'> {}

interface CommentInstance extends Model<CommentI, CommentCreation>, CommentI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Comment=sequelize.define<CommentInstance>(
  comments,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    content: {
      allowNull: false,
      type: DataTypes.TEXT,
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




export default Comment