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
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");
const groupRoute = require("./routes/groupRoute");

io.on("connection", (socket) => {
  socket.on("joinRoom", ({ room, user }) => {
    const addedUser = addUser(user, room);
    if (addedUser) {
      socket.join(addedUser.room);
    }
  });
  socket.on("deliverMessage", ({ user, message }) => {
    const Founduser = getUser(user._id);
    Founduser && io.to(Founduser.room).emit("message", { ...user, message });
  });
});

const PORT = process.env.PORT || 5000;

app.use("/user", userRoute);
app.use("/group", groupRoute);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
