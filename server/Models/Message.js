const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema({
  message: String,
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  timestamp: { type: Date, default: Date.now, required: true },
  new: Boolean,
});

module.exports = mongoose.model("Message", messageSchema);
