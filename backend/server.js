import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("YEEEEEESSSSSSSSSSSSS...........");
});

const PORT = 8000;
app.listen(PORT, () => {
  console.log("Server running on : ", PORT);
});

