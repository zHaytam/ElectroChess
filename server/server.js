const WebSocket = require('ws');

const wss = new WebSocket.Server({
  port: 1997
}, function () {
  console.log("Listening on port 1997.");
});

sendJsonToWs = function (ws, data) {
  ws.send(JSON.stringify(data));
}

wss.on('connection', function (ws, req) {

  console.log("New client.");

  ws.on('message', function (message) {
    console.log(message);
  });

  ws.on('close', function () {
    console.log("connecion closed.");
  });

  sendJsonToWs(ws, {
    connected: true,
  });
});
