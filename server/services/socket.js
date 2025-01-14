import { Server } from "socket.io";

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

      socket.on("event:message", async (message) => {
        console.log("new message received", message);
      });
    });
  }

  get io() {
    return this._io;
  }
}

export default SocketService;
