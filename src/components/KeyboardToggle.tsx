
import React from 'react';
import { Button } from "@/components/ui/button";

interface KeyboardToggleProps {
  isFullKeyboard: boolean;
  onToggle: () => void;
}

const KeyboardToggle: React.FC<KeyboardToggleProps> = ({ isFullKeyboard, onToggle }) => {
  return (
    <div className="flex justify-center mb-4">
      <div className="inline-flex bg-gray-200 rounded-md p-1">
        <Button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            !isFullKeyboard 
              ? 'bg-white text-app-dark-navy shadow-sm' 
              : 'bg-transparent text-gray-500'
          }`}
          onClick={() => !isFullKeyboard || onToggle()}
        >
          Mobile
        </Button>
        <Button
          className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
            isFullKeyboard 
              ? 'bg-white text-app-dark-navy shadow-sm' 
              : 'bg-transparent text-gray-500'
          }`}
          onClick={() => isFullKeyboard || onToggle()}
        >
          Full PC
        </Button>
      </div>
    </div>
  );
};

export default KeyboardToggle;
