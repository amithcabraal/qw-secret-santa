import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Menu as MenuIcon, X, HelpCircle, Share2, Lock, Home } from 'lucide-react';
import { useGameStore } from '../store/gameStore';
import { Button } from './ui/Button';

export const Menu: React.FC = () => {
  const { isMenuOpen, toggleMenu } = useGameStore();
  const navigate = useNavigate();
  const location = useLocation();
  
  const handleNavigation = (path: string) => {
    navigate(path);
    toggleMenu();
  };

  const isAdmin = location.pathname === '/admin';

  return (
    <div className="fixed top-0 right-0 z-50">
      <Button variant="icon" onClick={toggleMenu} className="m-4 bg-gray-800/50 hover:bg-gray-800/70">
        {isMenuOpen ? <X size={24} /> : <MenuIcon size={24} />}
      </Button>
      
      {isMenuOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-gray-800 rounded-lg shadow-xl p-4 text-white">
          <div className="space-y-2">
            {!isAdmin && (
              <Button
                variant="secondary"
                onClick={() => handleNavigation('/admin')}
                className="w-full justify-start gap-2"
              >
                <Lock size={18} />
                Admin Mode
              </Button>
            )}
            
            {isAdmin && (
              <Button
                variant="secondary"
                onClick={() => handleNavigation('/')}
                className="w-full justify-start gap-2"
              >
                <Home size={18} />
                Play Mode
              </Button>
            )}

            <Button
              variant="secondary"
              onClick={() => handleNavigation('/how-to-play')}
              className="w-full justify-start gap-2"
            >
              <HelpCircle size={18} />
              How to Play
            </Button>

            <Button
              variant="secondary"
              onClick={() => handleNavigation('/privacy')}
              className="w-full justify-start gap-2"
            >
              <Lock size={18} />
              Privacy
            </Button>

            <Button
              variant="secondary"
              onClick={() => handleNavigation('/share')}
              className="w-full justify-start gap-2"
            >
              <Share2 size={18} />
              Share
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}