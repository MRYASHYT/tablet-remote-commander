
import React from 'react';

interface MobileKeyboardProps {
  onKey: (key: string) => void;
}

const MobileKeyboard: React.FC<MobileKeyboardProps> = ({ onKey }) => {
  // Basic keyboard layout rows
  const rows = [
    ['q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p'],
    ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
    ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Backspace'],
    ['123', 'Space', 'Return']
  ];

  // Function to render a single key
  const renderKey = (key: string) => {
    let keyClass = "bg-white p-2 rounded shadow-sm text-center";
    
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
        className={`${keyClass} m-1 flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100 min-w-[2rem] h-10`}
        onClick={() => onKey(key)}
      >
        {key === 'Backspace' ? '⌫' : key === 'Return' ? '⏎' : key === 'Space' ? '' : key}
      </button>
    );
  };

  // Render each row of the keyboard
  return (
    <div className="w-full bg-gray-200 p-3 rounded-t-xl shadow-inner">
      {rows.map((row, rowIndex) => (
        <div key={rowIndex} className="flex justify-center mb-2">
          {row.map(renderKey)}
        </div>
      ))}
    </div>
  );
};

export default MobileKeyboard;
