import React from 'react';
import { useGameStore } from '../../store/gameStore';

export const AnswerDisplay: React.FC = () => {
  const { showAnswer, currentImage } = useGameStore();

  if (!showAnswer) return null;

  return (
    <div className="absolute left-0 right-0 top-4 text-center">
      <div className="inline-block bg-white px-4 py-2 rounded-full">
        <p className="text-xl font-bold">{currentImage.personName}</p>
      </div>
    </div>
  );
};