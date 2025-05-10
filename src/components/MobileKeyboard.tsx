
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileKeyboardProps {
  onKey: (key: string) => void;
}

const MobileKeyboard: React.FC<MobileKeyboardProps> = ({ onKey }) => {
  const isMobile = useIsMobile();
  
  // Basic keyboard layout rows
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
    ['123', 'Space', 'Return']
  ];

  // Function to render a single key
  const renderKey = (key: string) => {
    let keyClass = "bg-white rounded shadow-sm text-center";
    
    // Responsive sizing based on device
    const keySize = isMobile ? "p-1 min-w-[1.8rem]" : "p-2 min-w-[2.5rem]";
    const keyHeight = isMobile ? "h-10" : "h-14";
    
    // Handle special keys
    switch (key) {
      case 'Shift':
      case '123':
      case 'Backspace':
      case 'Return':
        keyClass += " bg-gray-100 font-medium";
        break;
      case 'Space':
        keyClass += " col-span-6";
        break;
      default:
        break;
    }

    return (
      <button
        key={key}
        className={`${keyClass} ${keySize} ${keyHeight} m-1 flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100`}
        onClick={() => onKey(key)}
      >
        {key === 'Backspace' ? '⌫' : key === 'Return' ? '⏎' : key === 'Space' ? '' : key}
      </button>
    );
  };

  // Render each row of the keyboard
  return (
    <div className="w-full bg-gray-200 p-3 rounded-t-xl shadow-inner flex-grow flex flex-col justify-end">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map(renderKey)}
        </div>
      ))}
    </div>
  );
};

export default MobileKeyboard;
