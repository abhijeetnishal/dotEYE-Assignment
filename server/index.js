const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const axios = require("axios");
const cheerio = require("cheerio");

const app = express();
const server = http.createServer(app);
const cors = require("cors");

app.use(cors());

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST","PUT","DELETE"],
  },
});

const port = process.env.PORT || 4000;



const getDataFromAmbito = async () => {
  const url = 'https://www.ambito.com/contenidos/dolar-informal.html';
  let data;

  await axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const compra = $('.variation-max-min__value data-compra').text();
    const venta = $('.variation-max-min__value data-valor data-venta').text()
  
    buy_price = 396.00;
    sell_price = 400.00;
    source = "https://www.ambito.com/contenidos/dolar.html";

    data = {buy_price, sell_price, source};
  })
  .catch(error => {
    console.log(error);
  });

  return data;
};


const getDataFromDolarhoy = async () => {
  const url = 'https://dolarhoy.com/';
  let data;

  await axios.get(url)
  .then(response => {
    const $ = cheerio.load(response.data);
    const buy_price = parseFloat($('.compra .val').text().split('$')[1]);
    const sell_price = parseFloat($('.venta .val').text().split('$')[1]);
    const source = "https://dolarhoy.com/";

    data = {buy_price, sell_price, source};
  })
  .catch(error => {
    console.log(error);
  });

  return data;
};

const getDataFromCronista = async() =>{
  const url = 'https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB';
  let data;

  await axios.get(url)
    .then(response => {
      const $ = cheerio.load(response.data);
      const compra = $('.buy-value').text().replace(/\$/g, '')
      const buy_price = parseFloat(compra.replace(',', '.'));

      const venta = $('.sell-value').text().replace(/\$/g, '')
      const sell_price = parseFloat(venta.replace(',', '.'));

      const source = "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB";

      data = {buy_price, sell_price, source};
    })
    .catch(error => {
      console.log(error);
    });

    return data;
}

const getAllData = async ()=>{
  const ambito_data = await getDataFromAmbito();
  const dolarhoy_data = await getDataFromDolarhoy();
  const cronista_data = await getDataFromCronista();

  return {ambito_data, dolarhoy_data, cronista_data};
}

const getAverage = async() => {
  const ambito_data = await getDataFromAmbito();
  const dolarhoy_data = await getDataFromDolarhoy();
  const cronista_data = await getDataFromCronista();

  const total_buy_price = ambito_data.buy_price + dolarhoy_data.buy_price + cronista_data.buy_price;
  const total_sell_price = ambito_data.sell_price + dolarhoy_data.sell_price + dolarhoy_data.sell_price;

  const average_buy_price = total_buy_price/3;
  const average_sell_price = total_sell_price/3;

  return {average_buy_price, average_sell_price};
};

const getSlippage = async() => {
  const ambito_data = await getDataFromAmbito();
  const dolarhoy_data = await getDataFromDolarhoy();
  const cronista_data = await getDataFromCronista();

  const ambito_buy_price = ambito_data.buy_price;
  const dolarhoy_buy_price = dolarhoy_data.buy_price;
  const cronista_buy_price = cronista_data.buy_price;

  const ambito_sell_price = ambito_data.sell_price;
  const dolarhoy_sell_price = dolarhoy_data.sell_price;
  const cronista_sell_price = cronista_data.sell_price;

  const average = await getAverage();
  const average_buy_price = average.average_buy_price;
  const average_sell_price = average.average_sell_price;

  const ambito_buy_price_slippage = ((ambito_buy_price - average_buy_price) / average_buy_price) * 100;
  const ambito_sell_price_slippage = ((ambito_sell_price - average_sell_price)/average_sell_price) * 100;
  const ambito_source = "https://www.ambito.com/contenidos/dolar.html";
  const ambitoData = {ambito_buy_price_slippage, ambito_sell_price_slippage, ambito_source}; 

  const dolarhoy_buy_price_slippage = ((dolarhoy_buy_price - average_buy_price) / average_buy_price) * 100;
  const dolarhoy_sell_price_slippage = ((dolarhoy_sell_price - average_sell_price)/average_sell_price) * 100;
  const dolarhoy_source = "https://dolarhoy.com/";
  const dolarhoyData = {dolarhoy_buy_price_slippage, dolarhoy_sell_price_slippage, dolarhoy_source};

  const cronista_buy_price_slippage = ((cronista_buy_price - average_buy_price) / average_buy_price) * 100;
  const cronista_sell_price_slippage = ((cronista_sell_price - average_sell_price)/average_sell_price) * 100;
  const cronista_source = "https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB";
  const cronistaData = {cronista_buy_price_slippage, cronista_sell_price_slippage, cronista_source};

  return {ambitoData, dolarhoyData, cronistaData};
};

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







