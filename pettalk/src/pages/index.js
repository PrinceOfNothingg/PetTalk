import Link from 'next/link';
import { useState } from 'react';
import Chat from '../components/Chat';

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 to-purple-600 flex flex-col items-center justify-center text-white p-4">
      <h1 className="text-5xl font-extrabold mb-8 animate-bounce">PetTalk</h1>
      <div className="flex flex-col md:flex-row items-center justify-center w-full max-w-4xl space-y-8 md:space-y-0 md:space-x-8">
        <div className="bg-white p-6 rounded-lg shadow-xl flex flex-col items-center transform transition duration-500 hover:scale-110">
          <img src="/images/sunless.png" alt="Sunless" className="w-48 h-48 object-cover mb-4 rounded-full shadow-lg" />
          <h2 className="text-2xl font-bold text-gray-800">Chat with Sunless</h2>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-xl w-full md:w-1/2 flex flex-col">
          <Chat />
        </div>
      </div>
    </div>
  );
}
