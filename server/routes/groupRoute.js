const route = require("express").Router();
const Group = require("../Models/Group");
const User = require("../Models/User");
const imageUpload = require("../middlewares/multer");

route.get("/", async (req, res) => {
  try {
    Group.find({})
      .populate("members")
      .exec(function (err, groups) {
        if (err) {
          res.status(400).json(err);
        } else {
          res.status(200).json(groups);
        }
      });
  } catch (err) {
    res.status(400).json({ err });
  }
});

route.post("/", imageUpload.single("groupImg"), async (req, res) => {
  try {
    const { name, type } = req.body;
    const groupNameExist = await Group.findOne({ name });
    if (groupNameExist) {
      res.status(400).json({
        error:
          "Group with choosen name already exists. Please choose different one.",
      });
    } else {
      const newGroup = await Group.create({
        name,
        type,
        img: req.file.path,
        members: [],
      });
      // *********  Demo
      const users = await User.find({});
      users.forEach((user) => {
        newGroup.members.push(user._id);
      });
      await newGroup.save();
      // **********
      res.status(200).json(newGroup);
    }
  } catch (err) {
    res.status(400).json({ err });
  }
});

module.exports = route;
