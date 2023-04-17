const express = require('express');
const expressWs = require('express-ws');
const app = express();
const httpServer = require('http').createServer(app);
expressWs(app, httpServer);

app.ws('/socket', (ws, req) => {
    const message = req.body.message;    
  ws.on('message', (msg) => {
    console.log(`Received message: ${message}`);
    ws.send(`You sent: ${msg}`);
  });
});

const port = 4000;

httpServer.listen(port, () => {
  console.log('Server listening on port '+ port);
});
