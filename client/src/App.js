import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const ENDPOINT = "http://localhost:4000";

const Quotes = () => {
  const [quotes, setQuotes] = useState({});
  const [average, setAverage] = useState(null);
  const [slippage, setSlippage] = useState({});

  useEffect(() => {
    const socket = io(ENDPOINT);

    socket.on("connect", () => {
      console.log("Connected to server");
      socket.emit("getQuotes");
      socket.emit("getAverage");
      socket.emit("getSlippage");
    });

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
  }, []);

  return (
    <div>
      {/* <h1>Quotes</h1>
      <ul>
        {quotes.map((quote, index) => (
          <li key={index}>
            {quote.}: {quote.} USD
          </li>
        ))}
      </ul> */}
      <h1>Average</h1>
      {average !== null ? <p>Average Buy Price: {average.average_buy_price} USD</p> : <p>Loading...</p>}
      {average !== null ? <p>Average Sell Price: {average.average_sell_price} USD</p> : <p>Loading...</p>}
      <h1>Slippage</h1>
      {/* <ul>
        {slippage.map((slippageData) => (
          <li key={slippageData}>
            {slippageData}: {slippageData.slippage}
          </li>
        ))}
      </ul> */}
    </div>
  );
};

export default Quotes;
