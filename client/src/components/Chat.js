import React, { useState } from 'react';
import axios from 'axios';

function Chat() {
  const [message, setMessage] = useState('');
  const [chat, setChat] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = { sender: 'user', text: message };
    setChat([...chat, userMessage]);

    try {
      const response = await axios.post('/api/chat', { message });
      const botMessage = { sender: 'bot', text: response.data.reply };
      setChat([...chat, userMessage, botMessage]);
    } catch (error) {
      console.error('Error:', error);
    }

    setMessage('');
  };

  return (
    <div className="chat-container">
      <div className="chat-box">
        {chat.map((msg, index) => (
          <div key={index} className={`message ${msg.sender}`}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message..."
          required
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
}

export default Chat;
