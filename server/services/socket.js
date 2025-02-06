import { Server } from "socket.io";
import { redisDB } from "../db/redisdb.js";
import { ttl } from "../utils/constants.js";

class SocketService {
  _io;

  constructor() {
    console.log("init socket service...");

    this._io = new Server({
      cors: {
        allowedHeaders: ["*"],
        origin: "*",
      },
    });
  }

  initListeners() {
    const io = this._io;
    console.log("init socket listeners...");

    io.on("connect", (socket) => {
      console.log("New user is connected to the socket server:", socket.id);

      socket.on("join-room", async ({ roomCode, user }) => {
        await this.joinRoom(socket, roomCode, user);
      });

      socket.on("add-song", async ({ roomCode, song }) => {
        await this.addSong(socket, roomCode, song);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  async joinRoom(socket, roomCode, user) {
    const { id: userId } = user;

    console.log("joinuser", user);

    await redisDB.sadd(`room:${roomCode}:users`, userId);
    await redisDB.hset(`room:${roomCode}:user:${userId}`, user);
    await redisDB.expire(`room:${roomCode}:users`, ttl);
    await redisDB.expire(`room:${roomCode}:user:${userId}`, ttl);

    socket.join(roomCode);

    this._io
      .to(roomCode)
      .emit("user-joined", { user, message: `User ${userId} joined.` });

    console.log(`User ${userId} joined room: ${roomCode}`);
  }

  async addSong(socket, roomCode, song) {
    const songKey = `room:${roomCode}:song:${song.songId}`;
    const roomSongsKey = `room:${roomCode}:songs`;

    const isSongAlreadyAdded = await redisDB.exists(songKey);
    console.log("songid", isSongAlreadyAdded);

    if (isSongAlreadyAdded) {
      return socket.emit("song-add-failed", {
        message: `Song is already added!`,
      });
    }

    console.log("reached here");

    await redisDB.hset(songKey, song);
    await redisDB.zadd(roomSongsKey, { score: 0, member: song.songId });
    await redisDB.expire(songKey, ttl);
    await redisDB.expire(roomSongsKey, ttl);

    this._io
      .to(roomCode)
      .emit("song-added", { song, message: `song added succesfully!` });

    console.log(`Song added in this room : ${roomCode}`);
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
