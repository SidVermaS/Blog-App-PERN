import { Request, Response } from 'express'
import Sequelize from 'sequelize'
import { v4 as uuidv4 } from 'uuid'
import { uploadPhoto } from '../methods/upload' 
import User from '../models/user.model'
import Post from '../models/post.model'
import { usersC, postsC } from '../constants/tables.constant'
import Like from '../models/like.model'

const create=async (req: Request<any>, res: Response<any>)=> {
    try {
        const id=uuidv4()
        req.body.file_type=postsC
        
        req.body.file_type=postsC
        req.body.file_name=`${id}.jpg`
        const photo_url:string=await uploadPhoto(req);
        if(photo_url) {
            const { title, caption, user_id }=req.body
            const post=await Post.create({
                id,
                title,
                caption,
                photo_url,
                user_id
            })
            if(post) {
                return res.status(201).json({ message: 'Successfully created the post', post })
            } else {
                return res.status(500).json({ message: "Failed to create the post", });
            }
        } else {
            return res.status(500).json({ message: "Failed to upload the photo", });
        }

    } catch (error) {
        return res.status(500).json({ message: "Failed to create the post", error });
    }
}

const fetch=async (req: Request<any>, res: Response<any>)=> {
    try {
        let { id, user_id }=req.query
        id=String(id)
        Post.belongsTo(User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        })
        User.hasOne(Post, {
            foreignKey: 'user_id',
        })
        Like.belongsTo(Post, {
            foreignKey: 'post_id', 
            targetKey: 'id',
        })
        Post.hasOne(Like, {
            foreignKey: 'post_id',
        })
        const post=await Post.findByPk(id, {
           
            attributes: ['id', 'title', 'caption','likes_count'],
            include: [
                {
                    model: User,
                    attributes: [
                        'public_user_id',
                        'name',
                        'photo_url',
                        
                    ]
                },
                {
                    model: Like,
                    attributes: [
                        'user_id',
                        'post_id'
                    ],
                    where: {
                        user_id: user_id,
                        post_id: id,
                    },
                    required: false
                }
            ],
            
        })
        if(post) {
            return res.status(200).json({ message: 'Successfully fetched the post', post })
        } else {
            return res.status(500).json({ message: "Failed to fetch the post", })
        }
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch the post", error })
    }
}

const fetchAll=async (req: Request<any>, res: Response<any>)=> {
    try {
        let { user_id, page, limit }:any=req.query        
        page=parseInt(page)
        limit=parseInt(limit)
        
        Post.belongsTo(User, {
            foreignKey: 'user_id',
            targetKey: 'id',
        })
        User.hasOne(Post, {
            foreignKey: 'user_id',
        })

        Like.belongsTo(Post, {
            foreignKey: 'post_id', 
            targetKey: 'id',
        })
        Post.hasOne(Like, {
            foreignKey: 'post_id',
        })
        Like.belongsTo(User, {
            foreignKey: 'user_id', 
            targetKey: 'id',
        })
        User.hasOne(Like, {
            foreignKey: 'user_id',
        })

        const posts=await Post.findAll({     
            attributes: ['id', 'title', 'caption', 'likes_count'],                   
            offset: page,
            limit: limit,
            include: [
                {
                    model: User,
                    attributes: [
                        'public_user_id',
                        'name',
                        'photo_url'
                    ]
                },
                {
                    model: Like,
                    attributes: [
                        'user_id',
                        'post_id'
                    ],
                    where: {
                        user_id: user_id,
                    },
                    required: false
                }
            ],
        })
        return res.status(200).json({ message: 'Successfully fetched the posts', posts })
    } catch (error) {
        return res.status(500).json({ message: "Failed to fetch the posts", error });
    }
}

export {
    create,
    fetch,
    fetchAll,
}