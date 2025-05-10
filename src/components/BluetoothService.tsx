
import React, { useEffect, useState } from 'react';
import { toast } from "sonner";

interface BluetoothServiceProps {
  children: (props: {
    connected: boolean;
    connect: () => Promise<void>;
    disconnect: () => void;
    sendMouseMove: (deltaX: number, deltaY: number) => void;
    sendLeftClick: () => void;
    sendRightClick: () => void;
    sendDoubleClick: () => void;
    sendKey: (key: string) => void;
    sendScroll: (direction: 'up' | 'down') => void;
    sendBackspace: () => void;
  }) => React.ReactNode;
}

const BluetoothService: React.FC<BluetoothServiceProps> = ({ children }) => {
  const [connected, setConnected] = useState(false);
  const [device, setDevice] = useState<BluetoothDevice | null>(null);
  
  // This would be implemented for real Bluetooth functionality
  // For this demo, we'll simulate the connection
  const connect = async () => {
    try {
      // In a real implementation, we would use the Web Bluetooth API
      // But for this demo, we'll just simulate success
      // const device = await navigator.bluetooth.requestDevice({
      //   filters: [{ services: ['serial_port'] }]
      // });
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setConnected(true);
      // Simulate a device
      setDevice({ name: 'PC-Bluetooth' } as BluetoothDevice);
      console.log('Connected to device');
    } catch (error) {
      console.error('Error connecting to device:', error);
      toast.error("Failed to connect to PC");
    }
  };

  const disconnect = () => {
    // In a real implementation, we would disconnect from the device
    setConnected(false);
    setDevice(null);
    console.log('Disconnected from device');
  };

  const sendMouseMove = (deltaX: number, deltaY: number) => {
    if (!connected) return;
    console.log(`Mouse move: x=${deltaX}, y=${deltaY}`);
    // In a real implementation, we would send data to the PC
    // For demo purposes, we're just logging
  };

  const sendLeftClick = () => {
    if (!connected) return;
    console.log('Left click');
    // In a real implementation, we would send data to the PC
  };

  const sendRightClick = () => {
    if (!connected) return;
    console.log('Right click');
    // In a real implementation, we would send data to the PC
  };

  const sendDoubleClick = () => {
    if (!connected) return;
    console.log('Double click');
    // In a real implementation, we would send data to the PC
  };

  const sendKey = (key: string) => {
    if (!connected) return;
    console.log(`Key press: ${key}`);
    // In a real implementation, we would send data to the PC
  };

  const sendScroll = (direction: 'up' | 'down') => {
    if (!connected) return;
    console.log(`Scroll ${direction}`);
    // In a real implementation, we would send data to the PC
  };

  const sendBackspace = () => {
    if (!connected) return;
    console.log('Backspace key');
    // In a real implementation, we would send data to the PC
  };

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (connected) {
        disconnect();
      }
    };
  }, [connected]);

  return (
    <>
      {children({
        connected,
        connect,
        disconnect,
        sendMouseMove,
        sendLeftClick,
        sendRightClick,
        sendDoubleClick,
        sendKey,
        sendScroll,
        sendBackspace,
      })}
    </>
  );
};

export default BluetoothService;
