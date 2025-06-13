const express = require("express");
const app = express();
const http = require("http").createServer(app);
const { Server } = require("socket.io");
const io = new Server(http);

const path = require("path");

app.use(express.static(path.join(__dirname, "public")));

let users = {};

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("setUsername", (name) => {
    users[socket.id] = name;
    io.emit("updateUserList", Object.values(users));
  });

  socket.on("chat message", (msg) => {
    const sender = users[socket.id] || "Anonymous";
    io.emit("chat message", { name: sender, msg });
  });

  socket.on("disconnect", () => {
    delete users[socket.id];
    io.emit("updateUserList", Object.values(users));
  });
});

http.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});
