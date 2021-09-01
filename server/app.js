const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const socketIO = require("socket.io");
const { addUser, getUser } = require("./socket/socketUsers");
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
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");
const groupRoute = require("./routes/groupRoute");
const messageRoute = require("./routes/messageRoute");

io.on("connection", (socket) => {
  socket.on("join-group", ({ user, room }) => {
    socket.join(room);
    io.to(room).emit("join-group", `${user.username} joined ${room}`);
  });
  socket.on("send-message", ({ user, message, room }) => {
    io.to(room).emit("send-message", { user, message, room });
  });
});

const PORT = process.env.PORT || 5000;

app.use("/user", userRoute);
app.use("/group", groupRoute);
app.use(messageRoute);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
