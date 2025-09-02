import {Router} from 'express'

const router = Router();
router.post("/signup", signupUser);
export default router;
