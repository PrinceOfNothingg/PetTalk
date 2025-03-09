import { useState } from 'react';

export default function Chat() {
  const [userInput, setUserInput] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (userInput.trim() !== '') {
      setChatHistory([...chatHistory, { user: 'You', message: userInput }]);
      setUserInput('');

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });

      const data = await response.json();
      setChatHistory([...chatHistory, { user: 'You', message: userInput }, { user: 'Sunless', message: data.response }]);
    }
  };

  return (
    <div className="w-full">
      <div className="flex-1 overflow-y-auto mb-4 max-h-60 bg-transparent">
        {chatHistory.map((chat, index) => (
          <div key={index} className="mb-2">
            <strong>{chat.user}:</strong> {chat.message}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        className="border p-2 rounded w-full mb-2 bg-transparent text-white"
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded w-full">
        Send
      </button>
    </div>
  );
}