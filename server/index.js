const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const app = express();
const server = http.createServer(app);

const port = process.env.PORT || 4000;

const cors = require("cors");

const {getAllData, getAverage, getSlippage} = require('./controller/controller');

app.use(cors({origin: ['https://doteyeassignment.vercel.app/','http://localhost:3000']}));

const io = new Server(server, {
  cors: {
    origin: ["http://localhost:3000", 'https://doteyeassignment.vercel.app/'],
    methods: ["GET", "POST","PUT","DELETE"],
  },
});


//routes
io.on("connection", (socket) => {
  console.log("Client connected");
  
  socket.on("disconnect", () => {
      console.log("Client disconnected");
  });
  
  socket.on("getQuotes", async () => {
      const data = await getAllData();
      socket.emit("quotes", data);
  });
  
  socket.on("getAverage", async () => {
      const average = await getAverage();
      socket.emit("average", { value: average });
  });
  
  socket.on("getSlippage", async () => {
      const slippageData = await getSlippage();
      socket.emit("slippage", slippageData);
  });
  });


server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

//get request when server is live
app.get('/',(req, res)=>{
  res.status(200).json('Server is Live');
})
