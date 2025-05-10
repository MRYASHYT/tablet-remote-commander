
import React from 'react';

interface PCKeyboardProps {
  onKey: (key: string) => void;
}

const PCKeyboard: React.FC<PCKeyboardProps> = ({ onKey }) => {
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
    let keyClass = "bg-white p-1 rounded shadow-sm text-center text-xs";
    
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
        keyClass += " px-16"; // Extra wide space bar
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
        className={`${keyClass} m-0.5 flex items-center justify-center transition-colors hover:bg-gray-50 active:bg-gray-100 h-8`}
        onClick={() => onKey(key)}
      >
        {displayText[key as keyof typeof displayText] || key}
      </button>
    );
  };

  // Render the full keyboard layout
  return (
    <div className="w-full bg-gray-200 p-2 rounded-t-xl shadow-inner overflow-auto">
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
