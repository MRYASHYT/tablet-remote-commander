
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ConnectionStatus from '@/components/ConnectionStatus';
import TouchPad from '@/components/TouchPad';
import KeyboardToggle from '@/components/KeyboardToggle';
import MobileKeyboard from '@/components/MobileKeyboard';
import PCKeyboard from '@/components/PCKeyboard';
import MouseButtons from '@/components/MouseButtons';
import BluetoothService from '@/components/BluetoothService';
import { Toaster } from "sonner";

const Index = () => {
  const [isFullKeyboard, setIsFullKeyboard] = useState(false);
  
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-slate-100 p-4">
      <Toaster position="top-center" />
      
      <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="p-4 bg-app-dark-navy text-white flex items-center justify-between">
          <h1 className="text-xl font-bold">Tablet Remote Control</h1>
          <BluetoothService>
            {({ 
              connected, 
              connect, 
              disconnect, 
              sendMouseMove, 
              sendLeftClick, 
              sendRightClick, 
              sendDoubleClick,
              sendKey,
              sendScroll,
              sendBackspace
            }) => (
              <ConnectionStatus 
                connected={connected} 
                onConnect={connect} 
                onDisconnect={disconnect} 
              />
            )}
          </BluetoothService>
        </div>
        
        <BluetoothService>
          {({ 
            connected, 
            sendMouseMove, 
            sendLeftClick, 
            sendRightClick, 
            sendDoubleClick,
            sendKey,
            sendScroll,
            sendBackspace
          }) => (
            <Tabs defaultValue="mouse" className="p-4 h-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="mouse">Mouse</TabsTrigger>
                <TabsTrigger value="keyboard">Keyboard</TabsTrigger>
              </TabsList>
              
              <TabsContent value="mouse" className="mt-4 space-y-6">
                <TouchPad 
                  onMove={sendMouseMove}
                  onClick={sendLeftClick}
                  onRightClick={sendRightClick}
                  onDoubleClick={sendDoubleClick}
                />
                
                <div className="text-center text-sm text-gray-500 py-2">
                  <p>Swipe to move cursor • Tap to click • Double-tap for double-click</p>
                  <p>Two-finger tap for right-click</p>
                </div>
                
                <MouseButtons
                  onLeftClick={sendLeftClick}
                  onRightClick={sendRightClick}
                  onScroll={sendScroll}
                  onBackspace={sendBackspace}
                />
              </TabsContent>
              
              <TabsContent value="keyboard" className="mt-4 flex flex-col h-[calc(100vh-240px)]">
                <KeyboardToggle 
                  isFullKeyboard={isFullKeyboard}
                  onToggle={() => setIsFullKeyboard(!isFullKeyboard)}
                />
                
                <div className="flex-grow flex flex-col">
                  {isFullKeyboard ? (
                    <PCKeyboard onKey={sendKey} />
                  ) : (
                    <MobileKeyboard onKey={sendKey} />
                  )}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </BluetoothService>
      </div>
      
      <div className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-xl shadow-lg">
        <h2 className="text-lg font-medium text-app-dark-navy">How to Use</h2>
        <div className="text-sm text-gray-600 mt-2">
          <p className="mb-2">1. Click <strong>Connect</strong> to establish a Bluetooth connection with your PC</p>
          <p className="mb-2">2. Use the <strong>Mouse</strong> tab for cursor control and clicks</p>
          <p className="mb-2">3. Switch to <strong>Keyboard</strong> tab for typing (choose between Mobile or Full PC layout)</p>
          <p className="mb-2">4. Ensure the PC listener application is running to receive commands</p>
        </div>
      </div>
      
      <footer className="max-w-3xl mx-auto mt-4 text-center text-xs text-gray-500">
        <p>Tablet PC Remote Control App v1.0</p>
      </footer>
    </div>
  );
};

export default Index;
