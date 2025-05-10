
import React, { useRef, useState } from 'react';

interface TouchPadProps {
  onMove: (deltaX: number, deltaY: number) => void;
  onClick: () => void;
  onRightClick: () => void;
  onDoubleClick: () => void;
}

const TouchPad: React.FC<TouchPadProps> = ({ 
  onMove, 
  onClick, 
  onRightClick, 
  onDoubleClick 
}) => {
  const touchPadRef = useRef<HTMLDivElement>(null);
  const [touchStartPos, setTouchStartPos] = useState({ x: 0, y: 0 });
  const [lastTouchTime, setLastTouchTime] = useState(0);
  const [ripple, setRipple] = useState<{ x: number, y: number, show: boolean }>({
    x: 0,
    y: 0,
    show: false
  });

  const handleTouchStart = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    setTouchStartPos({
      x: touch.clientX,
      y: touch.clientY
    });
    
    // Check if it's a double tap
    const currentTime = new Date().getTime();
    const tapLength = currentTime - lastTouchTime;
    setLastTouchTime(currentTime);
    
    if (tapLength < 300 && tapLength > 0) {
      onDoubleClick();
    }
    
    // Handle multi-touch for right click
    if (e.touches.length === 2) {
      onRightClick();
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    const touch = e.touches[0];
    const deltaX = touch.clientX - touchStartPos.x;
    const deltaY = touch.clientY - touchStartPos.y;
    
    onMove(deltaX * 1.5, deltaY * 1.5);
    
    setTouchStartPos({
      x: touch.clientX,
      y: touch.clientY
    });
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 0 && e.changedTouches.length === 1) {
      // Only register click if the touch didn't move much
      const touch = e.changedTouches[0];
      const deltaX = touch.clientX - touchStartPos.x;
      const deltaY = touch.clientY - touchStartPos.y;
      
      if (Math.abs(deltaX) < 10 && Math.abs(deltaY) < 10) {
        onClick();
        // Create ripple effect
        const rect = touchPadRef.current?.getBoundingClientRect();
        if (rect) {
          const x = touch.clientX - rect.left;
          const y = touch.clientY - rect.top;
          setRipple({ x, y, show: true });
          
          // Hide ripple after animation
          setTimeout(() => {
            setRipple(prev => ({ ...prev, show: false }));
          }, 500);
        }
      }
    }
  };

  return (
    <div 
      ref={touchPadRef}
      className="relative w-full h-64 rounded-xl bg-slate-200 shadow-inner overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {ripple.show && (
        <div 
          className="absolute bg-app-teal opacity-50 rounded-full w-5 h-5 animate-ripple"
          style={{ 
            left: ripple.x - 10, 
            top: ripple.y - 10,
          }}
        />
      )}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-30">
        <div className="w-32 h-32 border-2 border-gray-400 rounded-full"></div>
      </div>
    </div>
  );
};

export default TouchPad;
