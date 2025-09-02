import {Router} from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { changePasswordController, loginController, signupUserController } from '../controller/authController.js';

const authRouter = Router();
authRouter.post("/signup", signupUserController);
authRouter.post("/signin", loginController);
authRouter.put("/update", authMiddleware, changePasswordController);
export default authRouter;
