const axios = require('axios');
const socketIo = require('socket.io');
const http = require('http');


const quotesFunction = async ()=>{
    try {
        const urls = [
          'https://www.ambito.com/contenidos/dolar.html',
          'https://www.dolarhoy.com/',
          'https://www.cronista.com/MercadosOnline/moneda.html?id=ARSB'
        ];
    
        const responses = await Promise.all(
          urls.map((url) => axios.get(url))
        );
    
        const quotes = responses.map((response, index) => {
          const $ = cheerio.load(response.data);
          let quote;
    
          if (index === 0) {
            quote = $('div.cotizacion.dolar-blue span.compra').text().trim();
          } else if (index === 1) {
            quote = $('span.value.sell').text().trim();
          } else if (index === 2) {
            quote = $('div.col-xs-12.col-md-5.text-right h2').text().trim();
          }
    
          return { source: urls[index], quote };
        });
    
        io.emit('quotes', quotes);
        res.json(quotes);
      } catch (error) {
        console.error(error);
        res.status(500).send('Internal server error');
      }
}

const averageFunction = async ()=>{

}

const slippageFunction = async ()=>{

}

module.exports = {
    quotesFunction,
    averageFunction,
    slippageFunction
}