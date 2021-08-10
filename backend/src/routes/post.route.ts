import { Router } from "express";
import { create,fetch,fetchAll } from "../controllers/post.controller";

const router=Router()
router.post('/create', create)
router.get('/fetch', fetch)
router.get('/fetch/all', fetchAll)

export default router