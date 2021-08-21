const express = require("express");
const http = require("http");

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Hello, you have reached the server.");
});

server.listen(PORT, () => {
  console.log(`Server has started on port ${PORT}`);
});
