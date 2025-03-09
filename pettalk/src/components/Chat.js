import { useRouter } from 'next/router';
import { useState } from 'react';

export default function Chat() {
  const router = useRouter();
  const { pet } = router.query;
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
    <div>
      <h2 className="text-2xl font-bold mb-4"></h2>
      <div className="chat-history mb-4">
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
        className="border p-2 rounded w-full mb-2"
        placeholder="Type your message..."
      />
      <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded w-full">
        Send
      </button>
    </div>
  );
}
