import { io, Socket } from "socket.io-client";

const socketURL=process.env.NEXT_PUBLIC_SOCKET_SERVER_URL ;
console.log(socketURL);
class InitSocket{
    private SocketServer=socketURL;
    private static socket:Socket;
    public static isConnected:boolean;
    private InitSocket(){
        InitSocket.isConnected=false;
    }
    public static getConnection():Socket{
        if(!InitSocket.isConnected){
             InitSocket.socket =  io(socketURL);
             InitSocket.isConnected=true;
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