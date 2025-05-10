
import React, { useEffect, useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface MobileKeyboardProps {
  onKey: (key: string) => void;
}

const MobileKeyboard: React.FC<MobileKeyboardProps> = ({ onKey }) => {
  const isMobile = useIsMobile();
  const [keySize, setKeySize] = useState({ padding: "", minWidth: "", height: "" });
  
  // Update key sizes based on screen width
  useEffect(() => {
    if (isMobile) {
      setKeySize({
        padding: "p-1",
        minWidth: "min-w-[1.5rem]",
        height: "h-9"
      });
    } else {
      setKeySize({
        padding: "p-2",
        minWidth: "min-w-[2.5rem]",
        height: "h-12"
      });
    }
  }, [isMobile]);
  
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
        className={`${keyClass} ${keySize.padding} ${keySize.minWidth} ${keySize.height} m-1 flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100`}
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
