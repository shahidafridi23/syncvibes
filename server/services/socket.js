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

      socket.on("upvote-song", async ({ roomCode, songId, userId }) => {
        await this.upvoteSong(socket, roomCode, songId, userId);
      });

      socket.on("downvote-song", async ({ roomCode, songId, userId }) => {
        await this.downvoteSong(socket, roomCode, songId, userId);
      });

      socket.on("disconnect", () => {
        console.log("User disconnected:", socket.id);
      });
    });
  }

  async joinRoom(socket, roomCode, user) {
    const { id: userId } = user;

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

    if (isSongAlreadyAdded) {
      return socket.emit("song-add-failed", {
        message: `Song is already added!`,
      });
    }

    await redisDB.hset(songKey, song);
    await redisDB.zadd(roomSongsKey, { score: 0, member: song.songId });
    await redisDB.expire(songKey, ttl);
    await redisDB.expire(roomSongsKey, ttl);

    this._io
      .to(roomCode)
      .emit("song-added", { song, message: `song added succesfully!` });

    console.log(`Song added in this room : ${roomCode}`);
  }

  async upvoteSong(socket, roomCode, songId, userId) {
    const upvoteKey = `room:${roomCode}:song:${songId}:upvoters`;
    const downvoteKey = `room:${roomCode}:song:${songId}:downvoters`;
    const songScoreKey = `room:${roomCode}:songs`;

    const hasUpvoted = await redisDB.sismember(upvoteKey, userId);
    if (hasUpvoted) {
      return socket.emit("song-upvote-failed", {
        message: `You have already upvoted this song!`,
      });
    }

    const wasDownvoted = await redisDB.srem(downvoteKey, userId);

    if (wasDownvoted) {
      await redisDB.zincrby(songScoreKey, 1, songId);
    }

    await redisDB.sadd(upvoteKey, userId);
    await redisDB.expire(upvoteKey, ttl);

    const score = await redisDB.zincrby(songScoreKey, 1, songId);

    socket.emit("song-vote-response", {
      songId,
      upvote: true,
      downvote: false,
      score,
      message: "You have upvoted this song!",
    });
    socket.to(roomCode).emit("song-upvoted", {
      songId,
      score,
    });
  }

  async downvoteSong(socket, roomCode, songId, userId) {
    const upvoteKey = `room:${roomCode}:song:${songId}:upvoters`;
    const downvoteKey = `room:${roomCode}:song:${songId}:downvoters`;
    const songScoreKey = `room:${roomCode}:songs`;

    const hasDownvoted = await redisDB.sismember(downvoteKey, userId);
    if (hasDownvoted) {
      return socket.emit("song-downvote-failed", {
        message: `You have already downvoted this song!`,
      });
    }

    const wasUpvoted = await redisDB.srem(upvoteKey, userId);

    if (wasUpvoted) {
      await redisDB.zincrby(songScoreKey, -1, songId);
    }

    await redisDB.sadd(downvoteKey, userId);
    await redisDB.expire(downvoteKey, ttl);

    const score = await redisDB.zincrby(songScoreKey, -1, songId);

    socket.emit("song-vote-response", {
      songId,
      upvote: false,
      downvote: true,
      score,
      message: "You have downvoted this song!",
    });
    socket.to(roomCode).emit("song-downvoted", {
      songId,
      score,
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
