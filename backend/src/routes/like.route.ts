import { Router } from "express";
import { update, fetchAll } from "../controllers/like.controller";

const router = Router();
router.post("/update", update);
router.get("/fetch/all", fetchAll);

export default router;
