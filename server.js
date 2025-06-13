const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

const PORT = process.env.PORT || 3000;

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("A user connected");

  socket.on("chat message", (data) => {
    const { name, message } = data;
    console.log(`${name}: ${message}`);
    io.emit("chat message", { name, message });
  });

  socket.on("disconnect", () => {
    console.log("A user disconnected");
  });
});

http.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
