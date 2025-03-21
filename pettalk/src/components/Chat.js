import { useState, useEffect, useRef } from 'react';

export default function Chat({ setVideo }) {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);
  const [isTyping, setIsTyping] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    // Set the initial video to default.mp4
    setVideo('default.mp4');
  }, [setVideo]);

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
        let videoToPlay = 'default.mp4';
        if (sentimentScore > 0.5) {
          videoToPlay = 'laugh.mp4';
        } else if (sentimentScore < -0.5) {
          videoToPlay = 'sad.mp4';
        } else if (sentimentScore > 0) {
          videoToPlay = 'default.mp4';
        } else if (sentimentScore < 0) {
          videoToPlay = 'bored.mp4';
        }

        setVideo(videoToPlay);

        // Revert to default.mp4 after the video ends
        if (videoRef.current) {
          videoRef.current.onended = () => {
            setVideo('default.mp4');
          };
        }
      }, 1000);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
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
          onKeyDown={handleKeyDown}
          placeholder="Type your message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}