import express from "express";
import passport from "passport";
import jwt from "jsonwebtoken";
import { getProfile, login, register } from "../controllers/auth.js";
import authenticate from "../middlewares/auth.js";

const router = express.Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
    prompt: "consent",
  })
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false }),
  (req, res) => {
    const token = jwt.sign(
      { id: req.user.id, username: req.user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      }
    );
    res.redirect(`${process.env.CLIENT_URL}/auth-success?token=${token}`);
  }
);

router.post("/login", login);

router.post("/register", register);

router.get("/profile", authenticate, getProfile);

export default router;
