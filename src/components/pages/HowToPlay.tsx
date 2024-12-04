import React from 'react';

export const HowToPlay: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">How to Play</h1>
        <div className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-2">Game Rules</h2>
            <ul className="list-disc pl-6 space-y-2">
              <li>Try to guess who's behind the Santa mask</li>
              <li>Use the navigation arrows to move between images</li>
              <li>Click "Show Answer" to reveal who's behind the mask</li>
              <li>Challenge your friends to see who can guess the most correctly!</li>
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-2">Admin Mode</h2>
            <p>
              In admin mode, you can:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Add new images to the game</li>
              <li>Position and scale the Santa mask</li>
              <li>Edit or remove existing images</li>
              <li>Import and export your image collection</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};