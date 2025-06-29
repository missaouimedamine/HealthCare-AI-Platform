import { useState, useRef, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRobot, faUser, faPaperPlane } from '@fortawesome/free-solid-svg-icons';

export default function HealthAssistant() {
  const [messages, setMessages] = useState([
    { sender: 'bot', text: "Hello! I'm your Health Assistant. How can I help you today?" }
  ]);
  const [inputValue, setInputValue] = useState('');
  const messagesEndRef = useRef(null);

  // Function to format the bot's response with line breaks, lists, and bold text
  const formatBotResponse = (text) => {
    if (!text) return text;

    // Helper to replace **bold** with <strong>bold</strong>
    const renderBold = (str) => {
      const parts = str.split(/(\*\*[^\*]+\*\*)/g);
      return parts.map((part, idx) => {
        if (/^\*\*[^\*]+\*\*$/.test(part)) {
          return <strong key={idx}>{part.slice(2, -2)}</strong>;
        }
        return part;
      });
    };

    // Split by new lines and wrap each line in a div
    const lines = text.split('\n').filter(line => line.trim() !== '');

    return lines.map((line, i) => {
      // Check if the line starts with a number or bullet point
      const isListItem = /^(\d+\.|\-|\*)\s/.test(line);

      return (
        <div key={i} style={{
          marginBottom: i < lines.length - 1 ? '0.5rem' : 0,
          paddingLeft: isListItem ? '1rem' : 0
        }}>
          {renderBold(line)}
        </div>
      );
    });
  };

  const sendMessage = async () => {
    if (!inputValue.trim()) return;

    const userInput = inputValue;
    setMessages(prev => [...prev, { sender: 'user', text: userInput }]);
    setInputValue('');

    try {
      const response = await fetch('http://localhost:8000/api/chatbot/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: userInput,
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch");

      const data = await response.json();

      // Add the AI's response
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: data.answer || "Sorry, I couldn't understand your question.",
        },
      ]);
    } catch (error) {
      console.error("Error sending message:", error);
      setMessages(prev => [
        ...prev,
        {
          sender: 'bot',
          text: "Sorry, something went wrong while analyzing your symptoms.",
        },
      ]);
    }
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="health-assistant">
      <div className="chat-header">
        <FontAwesomeIcon icon={faRobot} className="header-icon" />
        <h2>Health Assistant</h2>
      </div>
      <div className="chat-container">
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender}-message`}>
              <div className="message-avatar">
                <FontAwesomeIcon 
                  icon={msg.sender === 'user' ? faUser : faRobot} 
                  className={msg.sender === 'bot' ? 'bot-avatar' : 'user-avatar'}
                />
              </div>
              <div className="message-content">
                {msg.sender === 'bot' ? formatBotResponse(msg.text) : msg.text}
                <div className="message-timestamp">
                  {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <div className="chat-input">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
            placeholder="Type your health question..."
          />
          <button onClick={sendMessage} className="send-button">
            <FontAwesomeIcon icon={faPaperPlane} />
          </button>
        </div>
      </div>
    </div>
  );
}