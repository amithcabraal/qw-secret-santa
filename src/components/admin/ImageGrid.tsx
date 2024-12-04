import React, { useRef, useEffect, useState } from 'react';
import { Pencil, Trash2, Eye, EyeOff } from 'lucide-react';
import { useGameStore } from '../../store/gameStore';
import { Button } from '../ui/Button';
import { calculateMaskSize } from '../../utils/maskScaling';

export const ImageGrid: React.FC = () => {
  const { images, deleteImage, selectedImageId, setSelectedImageId, toggleMask } = useGameStore();
  const [thumbnailSizes, setThumbnailSizes] = useState<Record<string, { width: number; height: number }>>({});
  const thumbnailRefs = useRef<Record<string, HTMLDivElement | null>>({});

  useEffect(() => {
    const updateThumbnailSizes = () => {
      const newSizes: Record<string, { width: number; height: number }> = {};
      Object.entries(thumbnailRefs.current).forEach(([id, ref]) => {
        if (ref) {
          const { width, height } = ref.getBoundingClientRect();
          newSizes[id] = { width, height };
        }
      });
      setThumbnailSizes(newSizes);
    };

    updateThumbnailSizes();
    window.addEventListener('resize', updateThumbnailSizes);
    return () => window.removeEventListener('resize', updateThumbnailSizes);
  }, [images.length]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (window.confirm('Are you sure you want to delete this image?')) {
      deleteImage(id);
    }
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {images.map((image) => {
        const size = thumbnailSizes[image.id];
        const maskWidth = size ? calculateMaskSize(size.width, size.height) : 150;

        return (
          <div
            key={image.id}
            ref={(el) => thumbnailRefs.current[image.id] = el}
            className={`
              relative group cursor-pointer rounded-lg overflow-hidden
              ${selectedImageId === image.id ? 'ring-4 ring-red-500' : ''}
            `}
            onClick={() => setSelectedImageId(image.id)}
          >
            <div className="relative pt-[100%]">
              <img
                src={image.imageUrl}
                alt={image.personName}
                className="absolute inset-0 w-full h-full object-contain"
              />
              {image.showMask && (
                <img
                  src="/santa-mask.png"
                  alt="Santa Mask"
                  className="absolute pointer-events-none"
                  style={{
                    left: `${image.maskPosition.x}%`,
                    top: `${image.maskPosition.y}%`,
                    transform: `
                      translate(-50%, -50%)
                      scale(${image.maskPosition.scale})
                      rotate(${image.maskPosition.rotation}deg)
                    `,
                    width: `${maskWidth}px`,
                    height: 'auto',
                  }}
                />
              )}
            </div>
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="absolute bottom-0 left-0 right-0 p-4">
                <p className="text-white font-semibold mb-2">{image.personName}</p>
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageId(image.id);
                    }}
                  >
                    <Pencil size={16} />
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 z-20"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleMask(image.id);
                    }}
                  >
                    {image.showMask ? <EyeOff size={16} /> : <Eye size={16} />}
                  </Button>
                  <Button
                    variant="secondary"
                    className="flex-1 z-20"
                    onClick={(e) => handleDelete(image.id, e)}
                  >
                    <Trash2 size={16} />
                  </Button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};