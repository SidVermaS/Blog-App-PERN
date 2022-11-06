import { Request, Response } from "express";
import Sequelize from "sequelize";
import User from "../models/user.model";
import Comment from "../models/comment.model";

const create = async (req: Request<any>, res: Response<any>) => {
  try {
    const { content, user_id, post_id } = req.body;
    const comment = await Comment.create({
      content,
      user_id,
      post_id,
    });
    if (comment) {
      return res
        .status(201)
        .json({ message: "Successfully created the comment", comment });
    } else {
      return res.status(500).json({ message: "Failed to create the comment" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to create the comment", error });
  }
};

const fetchAll = async (req: Request<any>, res: Response<any>) => {
  try {
    let { post_id, page, limit }: any = req.body;
    page = parseInt(page);
    limit = parseInt(limit);

    const commented_users = await Comment.findAll({
      attributes: ["id", "content"],
      offset: page,
      limit,
      include: [
        {
          attributes: ["public_user_id", "name", "photo_url"],
          model: User,
          as: "user",
        },
      ],
      where: {
        post_id,
      },
    });
    if (commented_users) {
      return res.status(200).json({
        message: "Successfully fetched the commented users",
        commented_users,
      });
    } else {
      return res
        .status(500)
        .json({ message: "Failed to fetch the commented users" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch the commented users", error });
  }
};
const destroy = async (req: Request<any>, res: Response<any>) => {
  try {
    const { id } = req.params;
    const comment = await Comment.destroy({ where: { id } });
    if (comment) {
      return res.status(204).json({
        message: "Successfully deleted the comment",
        comment,
      });
    } else {
      return res.status(500).json({ message: "Failed to delete the comment" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to delete the comment", error });
  }
};

export { create, fetchAll, destroy };
