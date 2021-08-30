const mongoose = require("mongoose");
const router = require("express").Router();
const Group = require("../Models/Group");

router.post("/group/message", async (req, res) => {
  const { groupId, message, sender } = req.body;
  const group = await Group.findById(groupId);
  group.messages.push({
    sender,
    message,
  });
  await group.save();
  res.status(200).json(group);
});

module.exports = router;
