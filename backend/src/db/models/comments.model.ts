import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import CommentsI from '../../interfaces/comments.interface'
import {users, posts, comments} from '../../constants/tables.constant'
import Users from './users.model'
import Posts from './posts.model'

interface CommentsCreation extends Optional<CommentsI, 'id'> {}

interface CommentsInstance extends Model<CommentsI, CommentsCreation>, CommentsI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Comments=sequelize.define<CommentsInstance>(
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
  }
)
Comments.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: posts
})
Comments.belongsTo(Users, {
    foreignKey: 'user_id',
    as: users
})

export default Comments