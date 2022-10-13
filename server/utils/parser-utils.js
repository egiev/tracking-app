const Message = require("../models/message");

const getLastMessagesFromRoom = async (room) => {
  const messages = await Message.aggregate([
    { $match: { to: room } },
    { $group: { _id: "$date", messagesByDate: { $push: "$$ROOT" } } },
  ]);

  return messages;
};

const sortRoomMessagesByKey = (messages) =>
  messages.sort((a, b) => a._id.localeCompare(b._id));

module.exports = { getLastMessagesFromRoom, sortRoomMessagesByKey };
