import { io, Socket } from "socket.io-client";

const socketURL=process.env.NEXT_PUBLIC_SOCKET_CONNECTION ;
// console.log(socketURL);
class InitSocket{
    private SocketServer=socketURL;
    private static socket:Socket;
    public static isConnected:boolean;
    private InitSocket(){
        InitSocket.isConnected=false;
    }
    public static getConnection():Socket{
        if(!InitSocket.isConnected){
             InitSocket.socket =  io(socketURL,{
                // transports: ["websocket", "polling"],
                 transports: ["websocket","polling"],
                    // path: "/socket.io",
                // withCredentials: true,
            });
             InitSocket.isConnected=true;
             InitSocket.socket.on("connect", () => {
            console.log("Socket connected with ID:", InitSocket.socket.id);
        });

        InitSocket.socket.on("connect_error", (err) => {
            console.error(" Socket connection error:", err.message);
        });
        }
        return InitSocket.socket;
    }
    public static closeConnection():boolean{
        if(InitSocket.isConnected){
            InitSocket.socket.disconnect();
            InitSocket.isConnected=false;
        }
        return InitSocket.isConnected;
    }
}
export default InitSocket;