### How to create a webSocket in express

- To create a WebSocket server in ExpressJS, you first need to create an instance of an HTTP server using the http module. You can then pass this server instance to the express function to create your ExpressJS app. After that, you can use the express-ws middleware to enable WebSocket support.
- Here's an example of how to create a simple WebSocket server in ExpressJS using express-ws:

```js
const express = require("express");
const expressWs = require("express-ws");
const app = express();
const httpServer = require("http").createServer(app);
expressWs(app, httpServer);

app.ws("/socket", (ws, req) => {
  ws.on("message", (msg) => {
    console.log(`Received message: ${msg}`);
    ws.send(`You sent: ${msg}`);
  });
});

httpServer.listen(3000, () => {
  console.log("Server listening on port 3000");
});
```

- In this example, we create an instance of the express app and an HTTP server. We then use the expressWs middleware to enable WebSocket support on our app.
- We define a route for WebSocket connections using the app.ws method, and then we handle incoming messages by logging them to the console and sending a response back to the client.
