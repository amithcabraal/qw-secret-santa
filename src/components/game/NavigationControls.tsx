import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '../ui/Button';
import { useImageNavigation } from '../../hooks/useImageNavigation';
import { useGameStore } from '../../store/gameStore';

export const NavigationControls: React.FC = () => {
  const { showAnswer, toggleAnswer } = useGameStore();
  const { nextImage, previousImage } = useImageNavigation();

  return (
    <div className="absolute left-0 right-0 bottom-8 flex justify-center gap-4">
      <Button 
        variant="icon" 
        onClick={previousImage}
        className="bg-gray-800/50 hover:bg-gray-800/70"
      >
        <ChevronLeft />
      </Button>
      
      <Button 
        onClick={toggleAnswer}
        className="bg-gray-800/50 hover:bg-gray-800/70"
      >
        {showAnswer ? 'Hide Answer' : 'Show Answer'}
      </Button>
      
      <Button 
        variant="icon" 
        onClick={nextImage}
        className="bg-gray-800/50 hover:bg-gray-800/70"
      >
        <ChevronRight />
      </Button>
    </div>
  );
};