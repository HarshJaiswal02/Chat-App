import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import userRoutes from "../backend/routes/users.routes.js";

import DbConnect from "./config/db.js";

dotenv.config();
const app = express();
app.use(cors());

app.use(cookieParser());
app.use(express.json()); //Parse the incoming request with JSON payload (body-parser)



app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use("/api/users", userRoutes);

const PORT = process.env.PORT || 8000;

DbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on : ", PORT);
    });
  })
  .catch(() => {
    console.log(`Error in server db connection`);
  });
