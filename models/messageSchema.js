const mongoose = require("mongoose");

const messageSchema = mongoose.Schema({
  messageText: { type: String, required: true },
  messageAuthor: { type: String, required: true },
  messageChat: { type: String, required: true }
});

module.exports = mongoose.model("Message", messageSchema);
