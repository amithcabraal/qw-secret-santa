export interface MaskPosition {
  x: number;
  y: number;
  scale: number;
  rotation: number;
}

export interface GameImage {
  id: string;
  imageUrl: string;
  personName: string;
  maskPosition: MaskPosition;
  showMask?: boolean;
}

export interface GameState {
  images: GameImage[];
  currentImageIndex: number;
  currentImage: GameImage;
  isAdmin: boolean;
  isMenuOpen: boolean;
  showAnswer: boolean;
  selectedImageId: string | null;
  
  setCurrentImageIndex: (index: number) => void;
  toggleMenu: () => void;
  toggleAdmin: () => void;
  toggleAnswer: () => void;
  updateMaskPosition: (position: MaskPosition) => void;
  addImage: (image: GameImage) => void;
  updateImage: (id: string, image: Partial<GameImage>) => void;
  deleteImage: (id: string) => void;
  importImages: (images: GameImage[]) => void;
  setSelectedImageId: (id: string | null) => void;
  toggleMask: (id: string) => void;
}