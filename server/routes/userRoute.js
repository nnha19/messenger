const express = require("express");
const route = express.Router();
const User = require("../Models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

route.get("/", async (req, res) => {
  try {
    const users = await User.find({});
    const usersWithoutPass = users.map((user) => {
      const { username, email, _id } = user;
      return { username, email, _id };
    });
    res.status(200).json({ users: usersWithoutPass });
  } catch (error) {
    res.status(400).json({ error });
  }
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
              const { username, email, _id } = newUser;
              res.status(200).json({ username, email, _id });
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

route.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const { username, email, _id } = user;
          res.status(200).json({ username, email, _id });
        } else {
          res.status(400).json({ error: "Incorrect Password" });
        }
      });
    } else {
      res.status(400).json({ error: "User with that email doesn't exist" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error });
  }
});

module.exports = route;
