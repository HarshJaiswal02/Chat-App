import { Router } from "express";
import { fetchAllUser } from "../controllers/users.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = Router();

router.get("/", protectRoute, fetchAllUser);

export default router;
