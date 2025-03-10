import { useState } from 'react';

export default function Chat({ setVideo }) {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      const newMessage = { user: 'You', message: userInput };
      setChatHistory([...chatHistory, newMessage]);
      setUserInput('');
      setIsTyping(true);
      setVideo('sleep.mp4'); // Default thinking video

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setTimeout(() => {
        setChatHistory([...chatHistory, newMessage, { user: 'Sunless', message: data.response }]);
        setIsTyping(false);

        // Log sentiment analysis results to the console
        console.log('Sentiment Analysis Result:', data.sentiment);

        // Change video based on sentiment score
        const sentimentScore = data.sentiment;
        if (sentimentScore > 0.5 && sentimentScore <= 1) {
          setVideo('laugh.mp4');
        } else if (sentimentScore < -0.5 && sentimentScore >= -1) {
          setVideo('sad.mp4');
        } else if (sentimentScore > 0 && sentimentScore <= 0.5) {
          setVideo('default.mp4');
        } else if (sentimentScore < 0 && sentimentScore >= -0.5) {
          setVideo('bored.mp4');
        } else {
          setVideo('default.mp4');
        }
      }, 1000);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-header">
        <img src="/images/sunlessavatar.png" alt="Sunless" className="avatar" />
        <h1>Chat with Sunless</h1>
      </div>
      <div className="chat-history">
        {chatHistory.map((chat, index) => (
          <div key={index} className={`chat-bubble ${chat.user === 'You' ? 'user' : 'sunless'}`}>
            <strong>{chat.user}:</strong> {chat.message}
          </div>
        ))}
        {isTyping && <div className="typing-indicator">Sunless is thinking...</div>}
      </div>
      <div className="chat-input">
        <input
          type="text"
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}