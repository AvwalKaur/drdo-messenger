const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);
const path = require("path");

// Serve static files
app.use(express.static(path.join(__dirname, "public")));

// Socket.IO logic
io.on("connection", (socket) => {
    console.log("A user connected");

    socket.on("chat message", ({ name, message }) => {
        io.emit("chat message", { name, message });
    });

    socket.on("disconnect", () => {
        console.log("A user disconnected");
    });
});

// ✅ THIS IS THE LINE YOU ASKED ABOUT
const PORT = process.env.PORT || 3000;

// ✅ START SERVER
http.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
