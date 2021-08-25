const route = require("express").Router();
const Group = require("../Models/Group");

route.get("/", (req, res) => {
  res.send("You have reached Group route.Con!");
});

module.exports = route;
