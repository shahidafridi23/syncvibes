import "dotenv/config";

import express from "express";
import authRoutes from "./routes/auth.js";
import passport from "./config/passportConfig.js";

const app = express();

//middlewares
app.use(express.json());

//initializing passport
app.use(passport.initialize());

//routes
app.use("/auth", authRoutes);

//wakeup route
app.get("/wakeup", (req, res) => {
  res.send("server is wokeup");
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`server is running at port ${port}`);
});
