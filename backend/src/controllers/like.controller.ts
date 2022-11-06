import { Request, Response } from "express";
import Sequelize from "sequelize";
import User from "../models/user.model";
import Like from "../models/like.model";

const update = async (req: Request<any>, res: Response<any>) => {
  try {
    const { id, post_id, user_id, status } = req.body;
    const previousLike = await Like.findAll({
      attributes: ["id"],
      where: { post_id, user_id },
    });
    if (previousLike.length) {
      if (status) {
        return res.status(400).json({ message: "Post is already liked" });
      } else {
        const like = await Like.destroy({ where: { id } });
        if (like) {
          return res
            .status(204)
            .json({ message: "Successfully unliked the post", like });
        } else {
          return res.status(500).json({ message: "Failed to unlike the post" });
        }
      }
    } else {
      if (status) {
        const like = await Like.create({
          post_id,
          user_id,
        });
        if (like) {
          return res
            .status(200)
            .json({ message: "Successfully liked the post", like });
        } else {
          return res.status(500).json({ message: "Failed to like the post" });
        }
      } else {
        return res.status(400).json({ message: "Post is already unliked" });
      }
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to updated the like", error });
  }
};

const fetchAll = async (req: Request<any>, res: Response<any>) => {
  try {
    const { post_id } = req.body;

    const liked_users = await User.findAll({
      attributes: ["public_user_id", "name", "photo_url"],
      include: [
        {
          attributes: ["id", "post_id", "user_id"],
          model: User,
          as: "Like",
          where: {
            post_id,
          },
        },
      ],
    });
    if (liked_users) {
      return res
        .status(200)
        .json({ message: "Successfully fetched the liked users", liked_users });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to fetch the liked users" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch the liked users", error });
  }
};

export { update, fetchAll };
