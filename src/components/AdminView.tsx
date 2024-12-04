import React from 'react';
import { Play } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Button } from './ui/Button';
import { ImageGrid } from './admin/ImageGrid';
import { ImageEditor } from './admin/ImageEditor';
import { AddImageButton } from './admin/AddImageButton';

export const AdminView: React.FC = () => {
  const { toggleAdmin } = useGameStore();

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-2xl font-bold">Image Management</h1>
          <Button 
            onClick={toggleAdmin}
            className="flex items-center gap-2"
          >
            <Play size={18} />
            Play Mode
          </Button>
        </div>
        
        <div className="flex justify-end mb-6">
          <AddImageButton />
        </div>

        <ImageGrid />
        <ImageEditor />
      </div>
    </div>
  );
};