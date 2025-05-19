import { useState } from "react";
import axios from "axios";
import "./css/Chatbot.css";

export default function Chatbot() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { sender: "user", text: input };
    setMessages([...messages, userMessage]);

    try {
      const response = await axios.post("http://localhost:5000/chatbot", { message: input });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages([...messages, userMessage, botMessage]);
    } catch (error) {
      console.error("Error fetching chatbot response:", error);
    }

    setInput("");
  };

  return (
    <div className="chatbot-container">
      <div className="chatbot-header">AI Chatbot</div>
      <div className="chatbot-messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender === "user" ? "user-message" : "bot-message"}>
            {msg.text}
          </div>
        ))}
      </div>
      <div className="chatbot-input-container">
        <input
          type="text"
          className="chatbot-input"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button className="chatbot-send-button" onClick={sendMessage}>Send</button>
      </div>
    </div>
  );
}
