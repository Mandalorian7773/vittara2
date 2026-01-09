"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right" 
      toastOptions={{ 
        duration: 3000, 
        style: { 
          background: '#2C1810', 
          color: '#fff',
          zIndex: 99999 
        },
        success: {
          iconTheme: {
            primary: '#D2691E',
            secondary: '#fff',
          },
        }
      }} 
    />
  );
}
