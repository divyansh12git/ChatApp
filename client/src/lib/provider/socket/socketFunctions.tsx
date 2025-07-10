import { useDispatch } from "react-redux";
import { useSocket } from "./socketProvider";

export function useSocketFunctions() {
  const socket = useSocket();
  const dispatch = useDispatch();

  const joinRoom = async (roomId: string): Promise<boolean> => {
    let status = false;
    if (!socket || !roomId) return status;

    try {
      console.log("Joining room:", roomId);
      socket.emit("joinRoom", roomId, () => {
        console.log(`Joined: ${roomId}`);
        status = true;
      });
    } catch (e) {
      console.error("Join error:", e);
    }

    return status;
  };

  return {
    joinRoom,
  };
}
