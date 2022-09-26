const http = require('http');
const { Server } = require('socket.io');

const app = require('./app');
const Booking = require('./models/booking');
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000',
  },
});

const { API_PORT } = process.env;
const port = process.env.PORT || API_PORT;

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('tracking', (data) => {
    io.emit('admin', data);
    // emitApi(data.user);
  });
});

const emitApi = async (slug) => {
  const obj = await Booking.findOne({ slug: slug });
  console.log(obj);
};

server.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
