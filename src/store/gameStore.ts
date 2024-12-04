import { create } from 'zustand';
import { GameState, GameImage, MaskPosition } from '../types/game';
import { loadImagesFromStorage, saveImagesToStorage } from '../utils/storage';

const initialImages = loadImagesFromStorage();

export const useGameStore = create<GameState>((set) => ({
  images: initialImages,
  currentImageIndex: 0,
  isAdmin: false,
  isMenuOpen: false,
  showAnswer: false,
  selectedImageId: null,
  
  currentImage: initialImages[0] || {
    id: '0',
    imageUrl: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6',
    personName: 'Example Person',
    maskPosition: { x: 50, y: 30, scale: 1, rotation: 0 },
    showMask: true
  },
  
  setCurrentImageIndex: (index: number) => 
    set((state) => ({
      currentImageIndex: index,
      currentImage: state.images[index],
      showAnswer: false
    })),
    
  toggleMenu: () => set((state) => ({ isMenuOpen: !state.isMenuOpen })),
  toggleAdmin: () => set((state) => ({ isAdmin: !state.isAdmin })),
  toggleAnswer: () => set((state) => ({ showAnswer: !state.showAnswer })),
  
  updateMaskPosition: (position: MaskPosition) => set((state) => {
    const newImages = state.images.map((img, idx) =>
      idx === state.currentImageIndex
        ? { ...img, maskPosition: position }
        : img
    );
    saveImagesToStorage(newImages);
    return {
      images: newImages,
      currentImage: {
        ...state.currentImage,
        maskPosition: position
      }
    };
  }),
  
  addImage: (image: GameImage) => set((state) => {
    const newImages = [...state.images, { ...image, showMask: true }];
    saveImagesToStorage(newImages);
    return { images: newImages };
  }),

  updateImage: (id: string, updates: Partial<GameImage>) => set((state) => {
    const newImages = state.images.map(img =>
      img.id === id ? { ...img, ...updates } : img
    );
    saveImagesToStorage(newImages);
    return {
      images: newImages,
      currentImage: state.currentImage.id === id 
        ? { ...state.currentImage, ...updates }
        : state.currentImage,
      selectedImageId: null
    };
  }),

  deleteImage: (id: string) => set((state) => {
    const newImages = state.images.filter(img => img.id !== id);
    saveImagesToStorage(newImages);
    return {
      images: newImages,
      currentImageIndex: 0,
      currentImage: newImages[0] || state.currentImage,
      selectedImageId: null
    };
  }),

  importImages: (newImages: GameImage[]) => set(() => {
    const imagesWithMask = newImages.map(img => ({ ...img, showMask: true }));
    saveImagesToStorage(imagesWithMask);
    return {
      images: imagesWithMask,
      currentImageIndex: 0,
      currentImage: imagesWithMask[0]
    };
  }),

  setSelectedImageId: (id: string | null) => set(() => ({
    selectedImageId: id
  })),

  toggleMask: (id: string) => set((state) => {
    const newImages = state.images.map(img =>
      img.id === id ? { ...img, showMask: !img.showMask } : img
    );
    saveImagesToStorage(newImages);
    return {
      images: newImages,
      currentImage: state.currentImage.id === id
        ? { ...state.currentImage, showMask: !state.currentImage.showMask }
        : state.currentImage
    };
  })
}));