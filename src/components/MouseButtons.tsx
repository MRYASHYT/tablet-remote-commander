
import React from 'react';
import { ArrowDown, ArrowUp, MousePointer, MousePointerClick } from 'lucide-react';

interface MouseButtonsProps {
  onLeftClick: () => void;
  onRightClick: () => void;
  onScroll: (direction: 'up' | 'down') => void;
  onBackspace: () => void;
}

const MouseButtons: React.FC<MouseButtonsProps> = ({ 
  onLeftClick, 
  onRightClick, 
  onScroll,
  onBackspace
}) => {
  return (
    <div className="flex justify-between items-center w-full p-4 bg-app-dark-navy rounded-lg shadow-md">
      <button 
        className="flex flex-col items-center justify-center w-16 h-16 bg-app-light-gray rounded-full shadow hover:bg-white transition-colors"
        onClick={onLeftClick}
      >
        <MousePointerClick className="h-6 w-6 text-app-dark-navy" />
        <span className="text-xs mt-1 text-app-dark-navy">Left</span>
      </button>
      
      <button 
        className="flex flex-col items-center justify-center w-16 h-16 bg-app-light-gray rounded-full shadow hover:bg-white transition-colors"
        onClick={onRightClick}
      >
        <MousePointer className="h-6 w-6 text-app-dark-navy" />
        <span className="text-xs mt-1 text-app-dark-navy">Right</span>
      </button>
      
      <div className="flex flex-col items-center">
        <button 
          className="flex items-center justify-center w-12 h-12 bg-app-light-gray rounded-full shadow hover:bg-white transition-colors mb-2"
          onClick={() => onScroll('up')}
        >
          <ArrowUp className="h-5 w-5 text-app-dark-navy" />
        </button>
        
        <button 
          className="flex items-center justify-center w-12 h-12 bg-app-light-gray rounded-full shadow hover:bg-white transition-colors"
          onClick={() => onScroll('down')}
        >
          <ArrowDown className="h-5 w-5 text-app-dark-navy" />
        </button>
      </div>
      
      <button 
        className="flex flex-col items-center justify-center w-16 h-16 bg-app-teal rounded-full shadow hover:opacity-90 transition-opacity"
        onClick={onBackspace}
      >
        <span className="text-2xl text-white">⌫</span>
        <span className="text-xs mt-1 text-white">Delete</span>
      </button>
    </div>
  );
};

export default MouseButtons;
