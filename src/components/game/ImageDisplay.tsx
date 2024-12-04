import React, { useState } from 'react';
import { useGameStore } from '../../store/gameStore';

export const ImageDisplay: React.FC = () => {
  const { currentImage, showAnswer } = useGameStore();
  const { maskPosition } = currentImage;
  const [maskLoaded, setMaskLoaded] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div className="relative w-full max-w-4xl mx-auto flex items-center justify-center">
      <div className="relative w-full" style={{ visibility: maskLoaded ? 'visible' : 'hidden' }}>
        <div className="relative max-h-[80vh] flex items-center justify-center">
          <img
            src={currentImage.imageUrl}
            alt="Person"
            className="max-w-full max-h-[80vh] w-auto h-auto object-contain"
            style={{ visibility: imageLoaded ? 'visible' : 'hidden' }}
            onLoad={() => setImageLoaded(true)}
          />
          
          {!showAnswer && (
            <img
              src="/santa-mask.png"
              alt="Santa Mask"
              className="absolute pointer-events-none"
              style={{
                left: `${maskPosition.x}%`,
                top: `${maskPosition.y}%`,
                transform: `
                  translate(-50%, -50%)
                  scale(${maskPosition.scale})
                  rotate(${maskPosition.rotation}deg)
                `,
                width: '150px',
                height: 'auto',
              }}
              onLoad={() => setMaskLoaded(true)}
            />
          )}
        </div>
      </div>
      
      {/* Loading state */}
      {(!maskLoaded || !imageLoaded) && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-red-500 border-t-transparent"></div>
        </div>
      )}
    </div>
  );
};