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

<br>
<br>

### To test the WebSocket server code in ExpressJS using React

1. Create a new React component file called WebSocketComponent.js in your project directory.

2. Add the following code to the component file:

```js
import React, { useState, useEffect } from "react";

const WebSocketComponent = () => {
  const [message, setMessage] = useState("");
  const [output, setOutput] = useState([]);

  const socket = new WebSocket("ws://localhost:3000/socket");

  useEffect(() => {
    socket.onmessage = (event) => {
      setOutput((prevOutput) => [...prevOutput, event.data]);
    };
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    socket.send(message);
    setMessage("");
  };

  return (
    <div>
      <h1>WebSocket Test</h1>
      <input type="text" value={message} onChange={handleMessageChange} />
      <button onClick={handleSendClick}>Send</button>
      <div>
        {output.map((msg, index) => (
          <p key={index}>Received message: {msg}</p>
        ))}
      </div>
    </div>
  );
};

export default WebSocketComponent;
```

3. Open a terminal window and navigate to your project directory.
4. Start the ExpressJS server by running the following command: node index.js
5. Navigate to the src directory of your React app and replace the contents of the App.js file with the following code:

```js
import WebSocketComponent from "./WebSocketComponent";

function App() {
  return (
    <div className="App">
      <WebSocketComponent />
    </div>
  );
}

export default App;
```

6. Start the React app by running the following command: npm start
7. Open a web browser and navigate to http://localhost:3000. You should see the WebSocketComponent rendered on the page.
8. Type a message into the input field and click the "Send" button. The message should be sent to the WebSocket server and echoed back to the client, where it will be displayed on the page.
9. Open the terminal window where you started the server, and you should see log messages indicating that the server received and sent messages over the WebSocket connection.
