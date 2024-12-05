import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.get("/wakeup", (req, res) => {
  res.send("server is wokeup");
});

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
