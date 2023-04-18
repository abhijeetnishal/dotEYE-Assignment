# Full Stack Developer Assessment

### Overview

- This project is a full-stack application that consists of a frontend and a backend.
- The backend is a WebSocket server built with Node.js/Express.js that exposes three different endpoints.
- The frontend is built with React and Next.js, and it displays the information of each backend endpoint and automatically refreshes the data every 0.5 seconds using websockets.

### Backend

- The backend is a WebSocket server built with Node.js/Express.js that exposes three different endpoints: /quotes, /average, and /slippage.
- The server retrieves blue USD quotes from 3 different sources and returns the data to the frontend via websockets.

### Requirements

- The backend must retrieve fresh information in real-time with HTTP (max time between last update is 0.5 secs).
- The backend must expose the data to the frontend with websockets.
- The project must be deployed and made available in some public URL.
- TypeScript is a nice-to-have requirement.
- Redis cache is a nice-to-have requirement.

### Endpoints

- Quotes
  GET /quotes - This endpoint returns an array of objects with a blue USD quotes retrieved from 3 different sources.

- The objects must have the following minimum structure/attributes (you can add new useful attributes and/or insights):

```json
{
  "buy_price": 140.3,
  "sell_price": 144,
  "source": "<https://www.ambito.com/contenidos/dolar.html>"
}
```

- Average
  GET /average - This endpoint returns an object with the average positions of all the quotes.

- The objects must have the following minimum structure/attributes (you can add new useful attributes and/or insights):

```json
{
  "average_buy_price": 142.3,
  "average_sell_price": 147.4
}
```

- Slippage
  GET /slippage - This endpoint returns an array of objects with the information of how much slippage percentage there is between each source and the average.
- The objects must have the following minimum structure/attributes (you can add new useful attributes and/or insights):

```json
{
  "buy_price_slippage": 0.04,
  "sell_price_slippage": -0.06,
  "source": "<https://www.ambito.com/contenidos/dolar.html>"
}
```

### Frontend

- The frontend is built with React and Next.js, and it displays the information of each backend endpoint and automatically refreshes the data every 0.5 seconds using websockets.

### Requirements

- The frontend must display the information of each backend endpoint.
- The frontend must automatically refresh the data every 0.5 seconds using websockets.
- The project must be deployed and made available in some public URL.
- TypeScript is a nice-to-have requirement.
- Use SWR or Redux (and Redux-Saga).
- Use any UI framework of your comfort.

### Deployment

- The project must be deployed and made available in some public URL. If you have no clue of how to do this, we suggest using Heroku for the frontend and AWS EC2 for the backend.
