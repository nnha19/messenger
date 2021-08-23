const express = require("express");
const http = require("http");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
dotenv.config();

const multer = require("multer");

const app = express();
app.use("/uploads", express.static(path.join("uploads")));
app.use(cors());
app.use(express.json());

const server = http.createServer(app);

mongoose
  .connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
  })
  .then(() => console.log("connected to mongoDB"))
  .catch((err) => console.log(err));

const userRoute = require("./routes/userRoute");

const PORT = process.env.PORT || 5000;

app.use("/user", userRoute);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
