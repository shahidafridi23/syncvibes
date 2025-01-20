import { Server } from "socket.io";
import { Redis } from "ioredis";

const pub = new Redis(process.env.UPSTASH_REDIS_URL);
const sub = new Redis(process.env.UPSTASH_REDIS_URL);

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

    sub.subscribe("JoinedUsers:room:*");
  }

  initListeners() {
    const io = this._io;
    console.log("init socket listeners...");

    io.on("connect", (socket) => {
      console.log("New user is connected to the socket server:", socket.id);

      socket.on("joinRoom", async (code, user) => {
        socket.join(code);
        console.log(`user:${user.username} join in room:${code}`);

        await pub.publish(
          `JoinedUsers:room:${code}`,
          JSON.stringify({
            user,
          })
        );
      });
    });

    sub.on("user", (channel, user) => {
      const roomCode = channel.split(":")[2];
      if (channel === "JoinedUsers:room:*") {
        io.to(roomCode).emit("user", user);
      }
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
