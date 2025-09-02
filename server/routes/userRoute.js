import {Router} from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getListStoresController, modifyRatingController, submitRatingController } from '../controller/userController.js';

const userRouter = Router();
userRouter.get("/", authMiddleware, getListStoresController);
userRouter.get("/rate", authMiddleware, submitRatingController);
userRouter.put("/update-rate", authMiddleware, modifyRatingController);
export default userRouter;
