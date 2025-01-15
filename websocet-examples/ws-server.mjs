import WebSocket, { WebSocketServer } from 'ws';

// const ws = new WebSocket('ws://www.host.com/path');

const wss = new WebSocketServer({ port: 8081 });

wss.on('connection', function connection(ws) {
  ws.on('error', console.error);

  ws.on('message', function message(data) {
    console.log('received: %s', data);
  });

  ws.send('🚀 ws connected');
});
