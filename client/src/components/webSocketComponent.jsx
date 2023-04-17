import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';

const WebSocketComponent = () => {
  const [message, setMessage] = useState('');
  const [output, setOutput] = useState([]);

  const socket = io('http://localhost:4001');

  useEffect(() => {
    socket.on('message', (message) => {
      setOutput((prevMessages) => [...prevMessages, message]);
    });
  }, []);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const handleSendClick = () => {
    socket.send(message);
    setMessage('');
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
