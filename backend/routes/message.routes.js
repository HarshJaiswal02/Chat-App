import express from "express";
import {
  receiveMessages,
  sendMessage,
} from "../controllers/message.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:id", protectRoute, receiveMessages);
router.post("/send/:id", protectRoute, sendMessage);

export default router;
