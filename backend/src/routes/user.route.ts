import { Router } from "express";
import { signUp, signIn, fetch, fetchAll } from "../controllers/user.controller";

const router=Router()
router.post('/sign-up', signUp)
router.post('/sign-in', signIn)
router.get('/fetch/:id', fetch)
router.get('/fetch', fetchAll)

export default router