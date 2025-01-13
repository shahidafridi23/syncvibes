import { z } from "zod";
import prisma from "../db/db.config.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const registerSchema = z.object({
    name: z.string().min(3, { message: "Enter your full name" }),
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  try {
    const validateData = registerSchema.parse(req.body);

    const { name, email, password } = validateData;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (user) {
      return res
        .status(404)
        .json({ message: "User already exists with this email" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await prisma.user.create({
      data: {
        username: email.split("@")[0],
        name: name,
        email: email,
        password: hashedPassword,
      },
    });

    const token = jwt.sign(
      { id: newUser.id, username: newUser.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(201).json({
      message: "User registered successfully",
      token,
      user: { ...newUser },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    res.status(500).json({ message: "something went wrong!" });
  }
};

export const login = async (req, res) => {
  const loginSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    password: z
      .string()
      .min(8, { message: "Password must be at least 8 characters" }),
  });

  try {
    const validateData = loginSchema.parse(req.body);

    const { email, password } = validateData;

    const user = await prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user.id, username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      message: "Login successful",
      token,
      user: { ...user },
    });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }

    res.status(500).json({ message: "something went wrong!" });
  }
};

export const getProfile = async (req, res) => {
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: req.user.id,
      },
    });

    res.status(200).json({
      id: user.id,
      username: user.username,
      name: user.name,
      profileImage: user.profileImage,
    });
  } catch (error) {
    res.status(500).json({ message: "something went wrong." });
  }
};
