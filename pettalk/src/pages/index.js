import React, { useState } from 'react';
import './Home.css';
import Chat from '../components/Chat';

export default function Home() {
  const [video, setVideo] = useState('sleep.mp4');

  return (
    <div className="home-container">
      <div className="video-container">
        <video src={`/videos/${video}`} autoPlay loop muted />
      </div>
      <div className="chatbox">
        <Chat setVideo={setVideo} />
      </div>
    </div>
  );
}