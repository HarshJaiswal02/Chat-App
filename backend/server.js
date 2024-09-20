import express from "express";
import authRoutes from "../backend/routes/auth.routes.js";
import DbConnect from "./config/db.js";
import dotenv from "dotenv";
dotenv.config();
const app = express();

app.use("/api/auth", authRoutes);

const PORT = 8000;

DbConnect()
  .then(() => {
    app.listen(PORT, () => {
      console.log("Server running on : ", PORT);
    });
  })
  .catch(() => {
    console.log(`Error in server db connection`);
  });
