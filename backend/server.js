import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import userRoutes from "../backend/routes/users.routes.js";
import path from "path";
import { fileURLToPath } from "url";
import DbConnect from "./config/db.js";
import { app, server } from "./socket/socket.js";

dotenv.config();
// const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json()); //Parse the incoming request with JSON payload (body-parser)

const __dirname = path.resolve();

app.use(express.static(path.join(__dirname, "/frontend/dist")));

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});
const PORT = process.env.PORT || 8000;

DbConnect()
  .then(() => {
    server.listen(PORT, () => {
      console.log("Server running on : ", PORT);
    });
  })
  .catch(() => {
    console.log(`Error in server db connection`);
  });
