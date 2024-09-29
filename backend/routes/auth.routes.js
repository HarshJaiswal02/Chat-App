import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.post("/login", loginUser);

router.post("/logout", logoutUser);

router.post("/signup", signupUser);

export default router;
