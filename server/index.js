const http = require("http");
const { Server } = require("socket.io");
const { API_PORT } = process.env;

const Branch = require("./models/branch");
const Message = require("./models/message");
const Tracking = require("./models/tracking");
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
  socket.on("online-users", async (branch) => {
    const members = await Booking.find({ branch, is_online: true });

    io.emit("booking-user", members);
  });

  socket.on("booking-user", async (payload) => {
    const { slug } = payload;
    const user = await Booking.findOne({ slug });
    user.is_online = true;
    await user.save();

    // Will use as a referrence for user
    socket.bookingUser = user;

    // Get all online users
    const members = await Booking.find({ is_online: true });

    io.emit("booking-user", members);
  });

  socket.on("join-room", async (currentRoom, previousRoom) => {
    socket.join(currentRoom);
    socket.leave(previousRoom);

    let roomMessages = await Utils.getLastMessagesFromRoom(currentRoom);
    roomMessages = Utils.sortRoomMessagesByKey(roomMessages, "_id");
    socket.emit("room-messages", roomMessages);
  });

  socket.on("message-room", async ({ room, content, sender, date, time }) => {
    console.log(date, time);
    await Message.create({
      from: sender,
      to: room,
      content,
      date,
      time,
    });

    let roomMessages = await Utils.getLastMessagesFromRoom(room);
    roomMessages = Utils.sortRoomMessagesByKey(roomMessages);
    io.to(room).emit("room-messages", roomMessages);
  });

  socket.on("join-tracking-room", async (branch) => {
    socket.join(branch);

    const trackings = await Tracking.find({ "user.branch": branch });

    io.to(branch).emit("tracking-room", trackings);
  });

  socket.on("tracking-room", async (user, coordinates) => {
    const { slug, branch } = user;
    const track = await Tracking.findOne({ "user.slug": slug });

    if (track) {
      console.log(track);
      track.location.coordinates.push(coordinates);
      track.save();
      // track;
      // track
    } else {
      await Tracking.create({
        user,
        location: {
          type: "LineString",
          coordinates: coordinates,
        },
      });
    }

    const updatedTrack = await Tracking.findOne({ "user.slug": slug });

    console.log(updatedTrack, updatedTrack);

    io.to(branch).emit("user-tracking-room", updatedTrack);
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
    console.log(members);
    io.emit("booking-user", members);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
