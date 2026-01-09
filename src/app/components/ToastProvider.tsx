"use client";

import { Toaster } from "react-hot-toast";

export default function ToastProvider() {
  return (
    <Toaster 
      position="bottom-right" 
      toastOptions={{ 
        duration: 3000, 
        style: { 
          background: '#000000', 
          color: '#fff',
          zIndex: 99999 
        },
        success: {
          iconTheme: {
            primary: '#000000',
            secondary: '#fff',
          },
        }
      }} 
    />
  );
}
