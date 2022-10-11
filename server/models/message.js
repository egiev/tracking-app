const { default: mongoose } = require("mongoose");

const MessageSchema = mongoose.Schema({
  socketid: String,
  from: Object,
  to: String,
  content: String,
  time: String,
  date: String,
});

module.exports = mongoose.model("Message", MessageSchema);
