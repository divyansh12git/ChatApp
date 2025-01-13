// context/SocketContext.ts
import React, { createContext, useContext, useEffect } from "react";
import { io, Socket } from "socket.io-client";


const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    return useContext(SocketContext);
  };

export const SocketProvider = ({ children }:any) => {
  const socket = io("http://localhost:4000");

  useEffect(() => {
    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, [socket]);
  
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};


