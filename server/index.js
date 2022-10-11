const http = require("http");
const { Server } = require("socket.io");
const { API_PORT } = process.env;

const Branch = require("./models/branch");
const Message = require("./models/message");
const Utils = require("./utils/parser-utils");

const app = require("./app");
const port = process.env.PORT || API_PORT;

// Models
const Booking = require("./models/booking");
const { parse } = require("path");

// Create live connection
const server = http.createServer(app);
const io = new Server(server);
io.sockets.setMaxListeners(0);

io.on("connection", (socket) => {
  socket.on("booking-user", async (payload) => {
    const { slug } = payload;
    const user = await Booking.findOne({ slug });
    user.is_online = true;
    await user.save();

    // Will use as a referrence
    socket.bookingUser = user;

    // Get all online users
    const members = await Booking.find({ is_online: true });
    io.emit("booking-user", members);
  });

  socket.on("join-room", async (room) => {
    socket.join(room);

    const roomMessages = await Utils.getLastMessagesFromRoom(room);
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async ({ room, content, sender }) => {
    await Message.create({
      from: sender,
      to: room,
      content,
      date: new Date(),
    });

    const roomMessages = await Utils.getLastMessagesFromRoom(room);
    io.to(room).emit("room-messages", roomMessages);
  });

  socket.on("disconnect", async () => {
    const { bookingUser } = socket;

    if (bookingUser) {
      const user = await Booking.findOne({ slug: bookingUser.slug });
      user.is_online = false;
      await user.save();

      delete socket["bookingUser"];
    }

    // Get all online user
    const members = await Booking.find({ is_online: true });
    io.emit("booking-user", members);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
