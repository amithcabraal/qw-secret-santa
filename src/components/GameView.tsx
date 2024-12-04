import React from 'react';
import { ImageDisplay } from './game/ImageDisplay';
import { NavigationControls } from './game/NavigationControls';
import { AnswerDisplay } from './game/AnswerDisplay';

export const GameView: React.FC = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gray-900">
      <div className="relative max-w-2xl mx-auto">
        <ImageDisplay />
        <NavigationControls />
        <AnswerDisplay />
      </div>
    </div>
  );
};