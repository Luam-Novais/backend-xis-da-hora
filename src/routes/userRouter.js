import { Router } from "express";
import userController from "../controllers/userController.js";
import userAuth from "../middlewares/userMidleware.js";
const router = Router()

router.post('/create-user', userController.createUser)
router.get('/get-infos-user', userAuth, userController.getInfosUser)

export default router