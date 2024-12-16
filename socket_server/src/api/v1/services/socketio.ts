import {Server} from "socket.io";


class SocketService{
    private _io: Server;

    constructor(httpServer:any){
        console.log("Initialised Socket server...");
        this._io=new Server(httpServer);
    }
    
    public initListeners(){
        const io=this.io;
        
        //validation...
        // io.use((socket,next)=>{
        //     next(new Error("thou shall not pass"));
        // });


        console.log("Initialized socket listener");

        io.on("connect",socket=>{
            console.log(`New Socket connnected: ${socket.id}`);
            // socket.on("emit:user-message",async({message}:{message:string})=>{
            //     console.log(`New message received: ${message}`);
            // })
            socket.on('emit:user-message', (msg) => {
                console.log('message: ' + msg);
                io.emit('broadcast', msg);
              });
        });
    }





    get io():Server{
        return this._io;
    }
    

}

export default SocketService;