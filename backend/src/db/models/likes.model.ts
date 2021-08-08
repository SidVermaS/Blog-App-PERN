import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import LikesI from '../../interfaces/likes.interface'
import {users, posts, likes} from '../../constants/tables.constant'
import Users from './users.model'
import Posts from './posts.model'

interface LikesCreation extends Optional<LikesI, 'id'> {}

interface LikesInstance extends Model<LikesI, LikesCreation>, LikesI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Likes=sequelize.define<LikesInstance>(
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
  }
)
Likes.belongsTo(Posts, {
  foreignKey: 'post_id',
  as: posts
})
Likes.belongsTo(Users, {
    foreignKey: 'user_id',
    as: users
})

export default Likes