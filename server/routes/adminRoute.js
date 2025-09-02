import { Router } from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import {
  createStoreByAdminController,
  createUserByAdminController,
  dashboardForAdminController,
  getUserDetailsForAdminController,
  getUsersForAdminController,
} from "../controller/adminController.js";

const adminRouter = Router();
adminRouter.post("/create-user", authMiddleware, createUserByAdminController);
adminRouter.post("/create-store", authMiddleware, createStoreByAdminController);
adminRouter.get("/dashboard", authMiddleware, dashboardForAdminController);
adminRouter.get("/get-user", authMiddleware, getUsersForAdminController);
adminRouter.get(
  "/create-user-details",
  authMiddleware,
  getUserDetailsForAdminController
);

export default adminRouter;
