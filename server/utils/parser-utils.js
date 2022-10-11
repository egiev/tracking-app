const Message = require("../models/message");

const getLastMessagesFromRoom = async (room) => {
  const messages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);

  return messages;
};

module.exports = { getLastMessagesFromRoom };
