import http from 'node:http';

import { Server as SocketIOServer } from 'socket.io';

const server = http.createServer();
const io = new SocketIOServer(server, {
  cors: {
    origin: '*', // Allow all origins for testing
    methods: ['GET', 'POST'],
  },
});

io.on('connection', (socket) => {
  console.log('A client connected');

  // Listen for messages from the client
  socket.on('message', (data) => {
    console.log('Message from client:', data);

    // Send a response back to the client
    socket.emit('message', `Server received: ${data}`);
  });

  // Handle disconnection
  socket.on('disconnect', () => {
    console.log('A client disconnected');
  });
});

server.listen(8888, () => {
  console.log('Socket.IO server is running on http://localhost:8888');
});
