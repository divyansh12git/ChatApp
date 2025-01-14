// context/SocketContext.ts
import React, { createContext, useContext, useEffect,useMemo } from "react";
import { io, Socket } from "socket.io-client";
import InitSocket from "./initSocket";

const SocketContext = createContext<Socket | null>(null);

export const useSocket = () => {
    const context= useContext(SocketContext);
    if (!context) {
      throw new Error("useSocket must be used within a SocketProvider");
    }
    return context;
  };

export const SocketProvider = ({ children }:any) => {
  const socket = InitSocket.getConnection();
  
    return (
        <SocketContext.Provider value={socket}>
            {children}
        </SocketContext.Provider>
    );
};


