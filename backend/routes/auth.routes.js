import { Router } from "express";
import {
  loginUser,
  logoutUser,
  signupUser,
} from "../controllers/auth.controller.js";

const router = Router();

router.get("/login", loginUser);

router.get("/logout", logoutUser);

router.get("/signup", signupUser);

export default router;
