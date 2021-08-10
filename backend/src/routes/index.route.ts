import { Router } from 'express'
import userRouter from './user.route'
import postRouter from './post.route'

const indexRouter=Router()
indexRouter.use('/user', userRouter)
indexRouter.use('/post', postRouter)

export default indexRouter