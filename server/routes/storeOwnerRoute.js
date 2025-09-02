import {Router} from 'express'
import { authMiddleware } from '../middleware/authMiddleware.js';
import { getDashboard } from '../controller/storeOwnerController.js';

const storeRouter = Router();
storeRouter.post("/", authMiddleware,getDashboard);

export default storeRouter;
