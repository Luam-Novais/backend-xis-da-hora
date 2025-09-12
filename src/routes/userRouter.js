import { Router } from "express";
import userController from "../controllers/userController.js";
import userAuth from "../middlewares/userMidleware.js";
const router = Router()

router.post('/create-user', userController.createUser)
router.post('/login-user', userController.loginUser)

export default router