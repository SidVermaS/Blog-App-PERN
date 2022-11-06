import { Router } from "express";
import userRouter from "./user.route";
import postRouter from "./post.route";
import likeRouter from "./like.route";

const indexRouter = Router();
indexRouter.use("/user", userRouter);
indexRouter.use("/post", postRouter);
indexRouter.use("/like", likeRouter);

export default indexRouter;
