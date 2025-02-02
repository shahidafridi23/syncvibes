import express from "express";
import {
  createRoom,
  getRoomByCode,
  getRooms,
  getUsersInThisRoom,
  initRoom,
  joinRoom,
} from "../controllers/room.js";

const router = express.Router();

router.post("/", createRoom);
router.get("/", getRooms);
router.get("/:code", getRoomByCode);

//redisRoutes
router.post("/:code", initRoom);
router.get("/:code/users", getUsersInThisRoom);
router.post("/join/:code", joinRoom);

export default router;
