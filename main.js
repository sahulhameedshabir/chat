const express = require("express");
const app = express();
const cors = require("cors");
const port = process.env.PORT || 8080;
const http = require("http");
const server = http.createServer();
const io = require("socket.io")(server, { cors: { origin: "*" } });
const { addUser, getUser, getUserRoom, removeUser } = require("./users");

app.use(cors());

io.on("connection", (socket) => {
  
  socket.on("join", ({ name, room }) => {
    addUser({ id: socket.id, name: name, room: room });
    socket.join(room);

    socket.emit("chat message",{user:'admin',message: `Welcome ${name} to ${room}`});

    io.to(room).emit("room data", getUserRoom(room));

    socket.broadcast
      .to(room)
      .emit("chat message",{user:'admin',message: `A new user ${name} has joined to our ${room} room`});

    socket.on("send message", (msg) => {
      let currentUser = getUser(socket.id);
      io.to(room).emit("chat message", { user: currentUser.name, message: msg });
    });

    socket.on("disconnect", () => {
      let leftUser = removeUser(socket.id);
      io.to(room).emit("chat message",{user:'admin', message:`${leftUser.name} has left`});
      io.to(room).emit("room data", getUserRoom(room));
    });
  });
});

server.listen(port, () => {
  console.log(`server started successfully at http://localhost:${port}`);
});
