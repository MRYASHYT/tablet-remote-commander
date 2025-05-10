
import React from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface PCKeyboardProps {
  onKey: (key: string) => void;
}

const PCKeyboard: React.FC<PCKeyboardProps> = ({ onKey }) => {
  const isMobile = useIsMobile();

  // Full keyboard layout
  const functionKeys = ['Esc', 'F1', 'F2', 'F3', 'F4', 'F5', 'F6', 'F7', 'F8', 'F9', 'F10', 'F11', 'F12'];
  const numberRow = ['`', '1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '-', '=', 'Backspace'];
  const qwertyRow = ['Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[', ']', '\\'];
  const asdfRow = ['Caps', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';', '\'', 'Enter'];
  const zxcvRow = ['Shift', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',', '.', '/', 'Shift'];
  const modifierRow = ['Ctrl', 'Win', 'Alt', 'Space', 'Alt', 'Menu', 'Ctrl'];
  const navigationKeys = ['PrtSc', 'ScrLk', 'Pause'];
  const arrowKeys = ['↑', '←', '↓', '→'];

  // Function to render a single key
  const renderKey = (key: string, isSpecial = false) => {
    // Responsive sizing based on device
    const keySize = isMobile ? "p-0.5 text-xs" : "p-1 text-sm";
    const keyHeight = isMobile ? "h-8" : "h-10";
    
    let keyClass = `bg-white rounded shadow-sm text-center ${keySize}`;
    
    // Handle special keys with larger size
    switch (key) {
      case 'Backspace':
      case 'Tab':
      case 'Caps':
      case 'Shift':
      case 'Ctrl':
      case 'Enter':
        keyClass += " bg-gray-100 font-medium px-2";
        break;
      case 'Space':
        keyClass += isMobile ? " px-10" : " px-16"; // Responsive space bar
        break;
      default:
        if (isSpecial) {
          keyClass += " bg-gray-100";
        }
        break;
    }

    // Different display text for some keys
    const displayText = {
      'PrtSc': 'PrtSc',
      'ScrLk': 'ScrLk',
      'Pause': 'Pause',
      'Enter': '⏎',
      'Backspace': '⌫',
      'Tab': '⇥',
      'Caps': 'Caps',
      'Shift': '⇧',
      'Ctrl': 'Ctrl',
      'Alt': 'Alt',
      'Win': '⊞',
      'Menu': '☰'
    };

    return (
      <button
        key={key}
        className={`${keyClass} ${keyHeight} m-0.5 flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100`}
        onClick={() => onKey(key)}
      >
        {displayText[key as keyof typeof displayText] || key}
      </button>
    );
  };

  // Render the full keyboard layout
  return (
    <div className="w-full bg-gray-200 p-2 rounded-t-xl shadow-inner overflow-auto flex-grow flex flex-col justify-end">
      <div className="flex justify-between mb-2">
        {functionKeys.map(key => renderKey(key, true))}
      </div>
      <div className="flex mb-1">
        {numberRow.map(key => renderKey(key, key === 'Backspace'))}
      </div>
      <div className="flex mb-1">
        {qwertyRow.map(key => renderKey(key, key === 'Tab'))}
      </div>
      <div className="flex mb-1">
        {asdfRow.map(key => renderKey(key, key === 'Caps' || key === 'Enter'))}
      </div>
      <div className="flex mb-1">
        {zxcvRow.map(key => renderKey(key, key === 'Shift'))}
      </div>
      <div className="flex mb-1">
        {modifierRow.map(key => renderKey(key, key !== 'Space'))}
      </div>
      <div className="flex justify-between">
        <div className="flex">
          {navigationKeys.map(key => renderKey(key, true))}
        </div>
        <div className="grid grid-cols-3 gap-0.5">
          <div className="col-start-2">
            {renderKey('↑', true)}
          </div>
          <div className="flex">
            {renderKey('←', true)}
            {renderKey('↓', true)}
            {renderKey('→', true)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PCKeyboard;
