const express = require("express");
const app = express();
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","DELETE"],
  },
});

//use to connect socket client
io.on("connection", (socket) => {
  console.log('New user connected');

  //receive data from client
  socket.on("send_message", (data) => {
    socket.emit("receive_message", data);
  });
});

server.listen(4000, () => {
  console.log("SERVER IS RUNNING");
});