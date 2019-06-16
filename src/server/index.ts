import * as express from "express";
import * as http from "http";
import * as socketio from "socket.io";

const app: express.Express = express();
const server: http.Server = http.createServer(app);
const io: socketio.Server = socketio(server);

app.use(express.static("public"));

io.on("connection", (socket: socketio.Socket) => {
    socket.on('chat message', (msg: string) => {
        io.emit('chat message', msg);
    });
});

server.listen(3000, () => console.log("listening on *:3000"));
