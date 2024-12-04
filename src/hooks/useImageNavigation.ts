import { useCallback } from 'react';
import { useGameStore } from '../store/gameStore';

export const useImageNavigation = () => {
  const { images, currentImageIndex, setCurrentImageIndex } = useGameStore();

  const nextImage = useCallback(() => {
    setCurrentImageIndex((currentImageIndex + 1) % images.length);
  }, [currentImageIndex, images.length]);

  const previousImage = useCallback(() => {
    setCurrentImageIndex(
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1
    );
  }, [currentImageIndex, images.length]);

  return { nextImage, previousImage };
};