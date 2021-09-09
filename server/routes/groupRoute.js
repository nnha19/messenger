const router = require("express").Router();
const Group = require("../Models/Group");
const User = require("../Models/User");
const imageUpload = require("../middlewares/multer");

router.get("/", async (req, res) => {
  try {
    Group.find({})
      .populate("messages.sender")
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

router.post("/", imageUpload.single("groupImg"), async (req, res) => {
  try {
    const { name, type, userId } = req.body;
    const groupNameExist = await Group.findOne({ name });
    if (groupNameExist) {
      res.status(400).json({
        error:
          "Group with choosen name already exists. Please choose different one.",
      });
    } else {
      const groupCreator = await User.findById(userId);
      const newGroup = await Group.create({
        name,
        type,
        img: req.file.path,
        members: [groupCreator],
        messages: [],
      });
      groupCreator.groups.push(newGroup._id);
      await groupCreator.save();
      res.status(200).json(newGroup);
    }
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
});

//add members to group
router.post("/member", async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    const group = await Group.findById(groupId);
    let userIsAlreadyMember = group.members.find((uid) => uid === userId);
    if (userIsAlreadyMember) {
      res.status(400).json("You are already member of this group.");
      return;
    }
    group.members.push(userId);
    await group.save();
    const user = await User.findById(userId);
    user.groups.push(groupId);
    await user.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/member", async (req, res) => {
  try {
    const { userId, groupId } = req.body;
    let group = await Group.findById(groupId);
    const updatedMembers = group.members.filter(
      (member) => member._id.toString() !== userId
    );
    group.members = updatedMembers;
    await group.save();
    let user = await User.findById(userId);
    const updatedGroup = user.groups.filter(
      (g) => g._id.toString() !== groupId
    );
    user.groups = updatedGroup;
    await user.save();
    res.status(200).json("Success.");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
