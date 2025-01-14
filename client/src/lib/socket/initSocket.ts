import { io, Socket } from "socket.io-client";

class InitSocket{
    private SocketServer="http://localhost:4000";
    private static socket:Socket;
    public static isConnected:boolean;
    private InitSocket(){
        InitSocket.isConnected=false;
    }
    public static getConnection():Socket{
        if(!InitSocket.isConnected){
             InitSocket.socket =  io("http://localhost:4000");
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