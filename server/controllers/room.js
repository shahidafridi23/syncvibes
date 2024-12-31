import { z } from "zod";
import { generateUniqueCode } from "../utils/generateCode.js";
import prisma from "../db/db.config.js";

const roomSchema = z.object({
  title: z
    .string()
    .min(3, { message: "title should be more than 3 characters." })
    .max(30, { message: "title should be less than 30 characters." }),
  description: z
    .string()
    .min(6, { message: "description should be more than 6 characters." })
    .max(50, { message: "description should be less than 50 characters." }),
});

export const createRoom = async (req, res) => {
  try {
    const validateData = roomSchema.parse(req.body);
    const user_id = req.user.id;

    const { title, description } = validateData;
    const code = await generateUniqueCode();

    const room = await prisma.room.create({
      data: {
        code,
        title,
        description,
        user_id,
      },
    });

    res.status(200).json({ message: "New Room has been created!", room });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({
        errors: error.errors.map((err) => ({
          field: err.path[0],
          message: err.message,
        })),
      });
    }
    console.log(error);
    res.status(500).json({ message: "something went wrong!" });
  }
};

export const getRooms = async (req, res) => {
  try {
    const user_id = req.user.id;
    const rooms = await prisma.room.findMany({
      where: {
        user_id,
      },
    });
    res.status(200).json({ message: `All rooms created by ${user_id}`, rooms });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const getRoomByCode = async (req, res) => {
  try {
    const user_id = req.user.id;
    const { code } = req.params;

    const room = await prisma.room.findFirst({
      where: {
        user_id,
        code,
      },
    });

    res.status(200).json({ message: `Room by code ${code}`, room });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
