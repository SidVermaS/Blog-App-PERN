import { Request, Response } from "express";
import Sequelize from "sequelize";
import { v4 as uuidv4 } from "uuid";
import jwt, { Secret } from "jsonwebtoken";
import { uploadPhoto } from "../methods/upload";
import User from "../models/user.model";
import { Tables } from "../constants/tables.constant";

const signUp = async (req: Request<any>, res: Response<any>) => {
  try {
    let id,
      public_user_id = uuidv4(),
      name,
      email,
      phone,
      password;
    req.body.file_type = Tables.users;

    req.body.file_type = Tables.users;
    req.body.file_name = `${public_user_id}.jpg`;
    const photo_url: string = await uploadPhoto(req);

    ({ name, email, phone, password } = req.body);
    if (
      await User.findOne({
        attributes: ["id"],
        where: {
          [Sequelize.Op.or]: [{ email }, { phone }],
        },
      })
    ) {
      return res
        .status(409)
        .json({ message: "Email/Phone no is already registered" });
    }
    const user = await User.create({
      name,
      email,
      phone,
      password,
      photo_url,
      public_user_id,
    });
    if (user) {
      ({ id, name, email, phone } = user);
      return res.status(201).json({
        message: "Successfully signed up",
        user: { id, name, email, phone, public_user_id },
      });
    } else {
      return res.status(400).json({ message: "Failed to sign up" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to sign up", error });
  }
};

const signIn = async (req: Request<any>, res: Response<any>) => {
  try {
    const { email_phone, password } = req.body;
    const user: any = await User.findOne({
      attributes: [
        "id",
        "public_user_id",
        "phone",
        "email",
        "password",
        "name",
        "photo_url",
      ],
      where: Number.isInteger(email_phone)
        ? { phone: email_phone }
        : { email: email_phone },
    });

    if (user) {
      if (await user.validPassword(password)) {
        const token: any = jwt.sign({ user }, process.env.PRIVATE_KEY!);
        const { id, public_user_id, email, phone, name, photo_url } = user;
        return res.status(201).json({
          message: "Successfully signed in",
          user: { id, public_user_id, email, phone, name, photo_url },
          token,
        });
      } else {
        return res.status(400).json({ message: "Email/phone is incorrect" });
      }
    } else {
      return res
        .status(409)
        .json({ message: "Email/Phone no isn't registered" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to sign in", error });
  }
};

const fetch = async (req: Request<any>, res: Response<any>) => {
  try {
    const { public_user_id } = req.params;

    const user = await User.findOne({
      attributes: ["public_user_id", "phone", "email", "name", "photo_url"],
      where: {
        public_user_id,
      },
    });
    if (user) {
      return res
        .status(200)
        .json({ message: "Successfully fetched the user", user });
    } else {
      return res.status(500).json({ message: "Failed to fetch the user" });
    }
  } catch (error) {
    return res.status(500).json({ message: "Failed to fetch the user", error });
  }
};

const fetchAll = async (req: Request<any>, res: Response<any>) => {
  try {
    const page = Number(req.query.page);
    const limit = Number(req.query.limit);
    const users = await User.findAll({
      offset: page,
      limit: limit,
      attributes: ["public_user_id", "phone", "email", "name", "photo_url"],
    });
    if (users) {
      return res
        .status(200)
        .json({ message: "Successfully fetched the users", users });
    } else {
      return res.status(500).json({ message: "Failed to fetch the users" });
    }
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Failed to fetch the users", error });
  }
};

export { signUp, signIn, fetch, fetchAll };
