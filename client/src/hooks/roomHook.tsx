// hooks/useRoom.js
import { useState, useEffect } from "react";
import { useSocket } from "@/lib/socket/socketProvider";

export const useRoom = (roomId:String) => {
  const socket = useSocket();
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    try{
        if (roomId && socket) {
            // Join the room
            socket.emit("joinRoom", roomId);
      
            // Listen for messages in the room
            const handleMessage = (data:String) => {
              //@ts-ignore
              setMessages((prev) => [...prev, data]);
            };
            socket.on("receiveMessage", handleMessage);
      
            // Cleanup listener on unmount or room change
            return () => {
              socket.off("receiveMessage", handleMessage);
            };
          }
    }catch(e){
        console.log("Error in reading message");
        console.log(e);
    }
  }, [roomId, socket]);

  const sendMessage = (message:String) => {
    try{
        if(message.length>0 && socket){
            socket.emit("sendMessage", { roomId, message });
        }
    }catch(e){
        console.log("Error in sending message");
        console.log(e);
    }
  };

  return { messages, sendMessage };
};


export default useRoom;