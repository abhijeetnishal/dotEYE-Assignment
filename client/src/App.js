import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";
const socket = io(ENDPOINT);

const Quotes = () => {
  const [quotes, setQuotes] = useState({});
  const [average, setAverage] = useState(null);
  const [slippage, setSlippage] = useState({});

  useEffect(() => {
      socket.on("connect", () => {
        console.log("Connected to server");
        socket.emit("getQuotes");
        socket.emit("getAverage");
        socket.emit("getSlippage");
      });
  }, []);

  useEffect(() => {
    const intervalId = setInterval(() => {
      socket.on("disconnect", () => {
        console.log("Disconnected from server");
      });
  
      socket.on("quotes", (data) => {
        console.log("Received quotes:", data);
        setQuotes(data);
      });
  
      socket.on("average", (data) => {
        console.log("Received average:", data);
        setAverage(data.value);
      });
  
      socket.on("slippage", (data) => {
        console.log("Received slippage:", data);
        setSlippage(data);
      });
  
      return () => {
        socket.disconnect();
        console.log("Disconnected from server");
      };
    }, 500);
  
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Quotes</h1>
      <div>
        {
          quotes? (quotes.ambito_data ? 
            (
            <div>
              <div className="cronista">
                <div>
                  cronista_data
                </div>
                <div>
                  buy_price: {quotes.cronista_data.buy_price}
                </div>
                <div>
                  sell_price: {quotes.cronista_data.sell_price}
                </div>
                <div>
                  source: {quotes.cronista_data.source}
                </div>
              </div>
              <div className="dolarhoy">
                <div>
                dolarhoy_data
                </div>
                <div>
                  buy_price: {quotes.dolarhoy_data.buy_price}
                </div>
                <div>
                  sell_price: {quotes.dolarhoy_data.sell_price}
                </div>
                <div>
                  source: {quotes.dolarhoy_data.source}
                </div>
              </div>
              <div className="ambito">
                <div>
                  ambito_data
                </div>
                <div>
                  buy_price: {quotes.ambito_data.buy_price}
                </div>
                <div>
                  sell_price: {quotes.ambito_data.sell_price}
                </div>
                <div>
                  source: {quotes.ambito_data.source}
                </div>
              </div>
            </div>
            ) :
            (
              <div>
              </div>
            )
            ) 
          :
          (<div>
          </div>)
        }
      </div>

      <h1>Average</h1>
      {average !== null ? <p>Average Buy Price: {average.average_buy_price} USD</p> : <p>Loading...</p>}
      {average !== null ? <p>Average Sell Price: {average.average_sell_price} USD</p> : <p>Loading...</p>}
      <h1>Slippage</h1>
      
      <div>
        {
          slippage? (slippage.ambitoData ? 
            (
            <div>
              <div className="ambito">
                <div>
                  ambito_data
                </div>
                <div>
                  buy_price_slippage: {slippage.ambitoData.ambito_buy_price_slippage}
                </div>
                <div>
                  sell_price_slippage: {slippage.ambitoData.ambito_sell_price_slippage}
                </div>
                <div>
                  source: {slippage.ambitoData.ambito_source}
                </div>
              </div>
              <div className="cronista">
                <div>
                  cronista_data
                </div>
                <div>
                  buy_price_slippage: {slippage.cronistaData.cronista_buy_price_slippage}
                </div>
                <div>
                  sell_price_slippage: {slippage.cronistaData.cronista_sell_price_slippage}
                </div>
                <div>
                  source: {slippage.cronistaData.cronista_source}
                </div>
              </div>
              <div className="dolarhoy">
                <div>
                dolarhoy_data
                </div>
                <div>
                  buy_price_slippage: {slippage.dolarhoyData.dolarhoy_buy_price_slippage}
                </div>
                <div>
                  sell_price_slippage: {slippage.dolarhoyData.dolarhoy_sell_price_slippage}
                </div>
                <div>
                  source: {slippage.dolarhoyData.dolarhoy_source}
                </div>
              </div>
            </div>
            ) :
            (
              <div>
              </div>
            )
            ) 
          :
          (<div>
          </div>)
        }
      </div>
    </div>
  );
};

export default Quotes;
