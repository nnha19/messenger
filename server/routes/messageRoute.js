const router = require("express").Router();
const Group = require("../Models/Group");
const Message = require("../Models/Message");

router.post("/group/message", async (req, res) => {
  try {
    const { groupId, message, sender } = req.body;
    const group = await Group.findById(groupId);
    const newMessage = await Message.create({
      message,
      sender,
    });
    group.messages.push(newMessage);
    await group.save();
    res.status(200).json(group);
  } catch (err) {
    res.status(400).json(err);
    console.log(err);
  }
});

module.exports = router;
