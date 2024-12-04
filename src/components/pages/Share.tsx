import React from 'react';
import { Share2 } from 'lucide-react';
import { Button } from '../ui/Button';

export const Share: React.FC = () => {
  const shareUrl = window.location.origin;

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Santa Mask Game',
          text: 'Try to guess who\'s behind the Santa mask!',
          url: shareUrl
        });
      } catch (error) {
        console.error('Error sharing:', error);
      }
    } else {
      navigator.clipboard.writeText(shareUrl);
      alert('Link copied to clipboard!');
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Share the Game</h1>
        <div className="space-y-6">
          <p>Share this fun guessing game with your friends and family!</p>
          
          <div className="flex flex-col items-center gap-4">
            <Button
              onClick={handleShare}
              className="flex items-center gap-2"
            >
              <Share2 size={18} />
              Share Game
            </Button>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <p className="text-sm text-gray-400 mb-2">Game URL:</p>
              <code className="text-red-400">{shareUrl}</code>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};