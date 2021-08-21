const express = require("express");
const http = require("http");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const server = http.createServer(app);

const userRoute = require("./routes/userRoute");

const PORT = process.env.PORT || 5000;

app.use("/user", userRoute);

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
