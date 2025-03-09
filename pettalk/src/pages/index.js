import React from 'react';
import './Home.css';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div className="home-container">
      <div className="image-container"></div>
      <div className="chatbox">
        <Chat />
      </div>
    </div>
  );
}