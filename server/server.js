const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 1997
}, function () {
  console.log("Listening on port 1997.");
});

wss.on('connection', function (ws) {

  ws.on('message', function (message) {
    console.log(message);
  });

  ws.send('test');
});
