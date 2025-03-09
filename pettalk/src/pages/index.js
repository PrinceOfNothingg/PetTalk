import React, { useState, useEffect } from 'react';
import './Home.css';
import Chat from '../components/Chat';

export default function Home() {
  const [video, setVideo] = useState('sleep.mp4');
  const [currentVideo, setCurrentVideo] = useState('sleep.mp4');

  useEffect(() => {
    if (video !== currentVideo) {
      const videoElement = document.getElementById('cat-video');
      videoElement.classList.add('fade-out');
      setTimeout(() => {
        setCurrentVideo(video);
        videoElement.classList.remove('fade-out');
      }, 500); // Duration of the fade-out animation
    }
  }, [video]);

  return (
    <div className="home-container">
      <div className="video-container">
        <video id="cat-video" src={`/videos/${currentVideo}`} autoPlay loop muted />
      </div>
      <div className="chatbox">
        <Chat setVideo={setVideo} />
      </div>
    </div>
  );
}