const express = require("express");
const route = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

route.get("/", (req, res) => {
  res.send("Hey.");
});

route.post("/", async (req, res) => {
  try {
    const { email, username, password } = req.body;
    const userExist = await User.findOne({ email });
    if (userExist) {
      res
        .status(400)
        .json({ error: "User with the provided email already exists." });
    } else {
      const saltRound = 10;
      bcrypt.genSalt(saltRound, (err, salt) => {
        bcrypt.hash(password, salt, async (err, hashed) => {
          if (err) {
            res.status(400).json({ error });
          } else {
            const newUser = await User.create({
              username,
              email,
              password: hashed,
            });
            if (newUser) {
              res.status(200).json(newUser);
            } else {
              res.status(400).json({ error: "Something went wrong." });
            }
          }
        });
      });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
});

module.exports = route;
