const http = require("http");
const { Server } = require("socket.io");
const { API_PORT } = process.env;

const app = require("./app");
const port = process.env.PORT || API_PORT;

// Models
const Booking = require("./models/booking");

// Create live connection
const server = http.createServer(app);
const io = new Server(server);

io.on("connection", (socket) => {
  console.log("a user connected");
  socket.on("tracking", (data) => {
    io.emit("admin", data);
  });
});

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
