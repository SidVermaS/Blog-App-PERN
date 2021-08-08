import { DataTypes, Model, Optional, } from 'sequelize'
import {sequelize} from '.'
import UsersI from '../../interfaces/users.interface'
import {users, posts, comments,likes} from '../../constants/tables.constant'
import Posts from './posts.model'
import Comments from './comments.model'
import Likes from './likes.model'

interface UsersICreation extends Optional<UsersI, 'id'> {}

interface UsersInstance extends Model<UsersI, UsersICreation>, UsersI {
  createdAt?: Date;
  updatedAt?: Date;
}

const Users=sequelize.define<UsersInstance>(
  users,
  {
    id: {
      allowNull: false,
      primaryKey: true,
      unique: true,
      type: DataTypes.UUID,
      defaultValue:  DataTypes.UUIDV4
    },
    public_user_id:  {
      allowNull: false,
      unique: true,
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    email: {
      allowNull: false,
      unique: true,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    },
    photo_url: {
      type: DataTypes.STRING
    }
  }
)
Users.hasMany(Posts, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: posts
})
Users.hasMany(Comments, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: comments
})
Users.hasMany(Likes, {
  sourceKey: 'id',
  foreignKey: 'user_id',
  as: likes
})
export default Users