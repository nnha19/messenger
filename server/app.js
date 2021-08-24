const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketIO = require("socket.io");
const { addUser, getUser } = require("./socket");
dotenv.config();

const app = express();
app.use("/uploads", express.static(path.join("uploads")));
app.use(cors());
app.use(express.json());

const server = http.createServer(app);
const io = socketIO(server, {
  cors: {
    origin: "*",
  },
});

mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ room, username, userId }) => {
    const user = addUser(userId, username, room);
    if (user) {
      socket.join(user.room);
      socket.emit("message", {
        username: "Admin",
        message: `Welcome to ${user.room}, ${user.username}`,
      });
      socket.broadcast.to(user.room).emit("message", {
        username: "Admin",
        message: `Guys, ${user.username} joined ${user.room}`,
      });
    }
  });
  socket.on("deliverMessage", ({ username, userId, message }) => {
    const user = getUser(userId);
    user && io.to(user.room).emit("message", { username, message });
  });
});

const PORT = process.env.PORT || 5000;

app.use("/user", userRoute);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
