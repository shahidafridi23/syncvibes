import express from "express";
import {
  createRoom,
  getCurrentlyPlayingSong,
  getRoomByCode,
  getRooms,
  getSongsInThisRoom,
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
router.get("/:code/songs", getSongsInThisRoom);
router.get("/:code/now-playing", getCurrentlyPlayingSong);
router.post("/join/:code", joinRoom);

export default router;
