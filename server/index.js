import "dotenv/config";

import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import passport from "./config/passportConfig.js";

const app = express();

//middlewares
app.use(express.json());
app.use(
  cors({
    origin: [process.env.CLIENT_URL],
  })
);

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
