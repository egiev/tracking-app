const http = require("http");
const { Server } = require("socket.io");
const { API_PORT } = process.env;

const Branch = require("./models/branch");

const app = require("./app");
const port = process.env.PORT || API_PORT;

// Models
const Booking = require("./models/booking");

// Create live connection
const server = http.createServer(app);
const io = new Server(server);
io.sockets.setMaxListeners(0);

const branchNamespace = io.of("/use-tracking-socket");

const users = [];
const rooms = [];

branchNamespace.on("connection", (socket) => {
  socket.on("join server", (data) => {
    const { branch, slug } = data;

    const index = users.findIndex((user) => user.slug === slug);

    if (index < 0) users.push(data);

    branchNamespace.emit(`${branch}`, data);
  });

  socket.on("send message", (data) => {
    const { branch } = data;

    // console.log(branch, message);
    branchNamespace.emit(`${branch} send message`, data);
  });

  socket.on("send to user", (data) => {
    console.log("send to user", data);
    branchNamespace.emit("receive message", data);
  });

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
