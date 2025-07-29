import React, { useEffect, useState } from 'react';
import axios from 'axios';

function MessageList() {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/messages/unlocked')
      .then(res => setMessages(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="max-w-xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Unlocked Messages</h2>
      {messages.map((msg) => (
        <div key={msg._id} className="border p-4 mb-4 rounded bg-white shadow">
          <p className="font-medium">{msg.userName} wrote:</p>
          <p className="italic">"{msg.content}"</p>
          <p className="mt-2 text-green-600 font-semibold">AI Evolution:</p>
          <p>{msg.evolvedMessage}</p>
        </div>
      ))}
    </div>
  );
}

export default MessageList;