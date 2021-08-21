const express = require("express");
const route = express.Router();

route.get("/", (req, res) => {
  res.send("Hey.");
});

route.post("/", (req, res) => {
  res.send("Hey.");
});

module.exports = route;
