import express from "express";
import { createRoom, getRoomByCode, getRooms } from "../controllers/room.js";

const router = express.Router();

router.post("/", createRoom);
router.get("/", getRooms);
router.get("/:code", getRoomByCode);

export default router;
