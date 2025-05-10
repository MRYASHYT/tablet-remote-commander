
import React from 'react';
import { toast } from "sonner";

interface ConnectionStatusProps {
  connected: boolean;
  onConnect: () => void;
  onDisconnect: () => void;
}

const ConnectionStatus: React.FC<ConnectionStatusProps> = ({ 
  connected, 
  onConnect, 
  onDisconnect 
}) => {
  const handleToggleConnection = () => {
    if (connected) {
      onDisconnect();
      toast.info("Disconnected from PC");
    } else {
      onConnect();
      toast.success("Connected to PC");
    }
  };

  return (
    <div className="flex items-center bg-app-dark-navy rounded-full px-4 py-2 shadow-md">
      <div 
        className={`w-3 h-3 rounded-full mr-2 ${connected ? 'bg-green-500' : 'bg-red-500'}`}
      />
      <span className="text-white text-sm">
        {connected ? 'Connected' : 'Disconnected'}
      </span>
      <button
        onClick={handleToggleConnection}
        className="ml-3 text-xs bg-app-teal text-white px-2 py-1 rounded-md hover:opacity-90 transition-opacity"
      >
        {connected ? 'Disconnect' : 'Connect'}
      </button>
    </div>
  );
};

export default ConnectionStatus;
