
/// <reference types="vite/client" />

// Define the BluetoothDevice interface which is needed in BluetoothService.tsx
interface BluetoothDevice {
  name?: string;
  id?: string;
  gatt?: {
    connected: boolean;
    connect: () => Promise<any>;
    disconnect: () => void;
  };
}
