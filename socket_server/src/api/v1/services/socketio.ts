import {Server} from "socket.io";


class SocketService{
    private _io: Server;

    constructor(){
        console.log("Initialised Socket server...");
        this._io=new Server({
            cors:{
                allowedHeaders:['*'],
                origin:"*"
            }
        });
    }

    public initListeners(){
        const io=this.io;
        console.log("Initialized socket listener");

        io.on("connect",socket=>{
            console.log(`New Socket connnected: ${socket.id}`);
            socket.on("emit:message",async({message}:{message:string})=>{
                console.log(`New message received: ${message}`);
            })
        });
    }





    get io():Server{
        return this._io;
    }


}

export default SocketService;