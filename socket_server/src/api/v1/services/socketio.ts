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
            socket.on('join-room',(roomId)=>{
                socket.join(roomId);
                console.log(`User ${socket.id} joined room: ${roomId}`);
                socket.to(roomId).emit('user-joined', `User ${socket.id} has joined the room`);
            })

            socket.on('emit:user-message', (data) => {
                const { roomId, msg } = data;
                console.log('message: ' + msg);
                socket.in(roomId).emit('receive-message', {
                    sender: socket.id,
                    msg,
                });
              });
        });
    }





    get io():Server{
        return this._io;
    }
    

}

export default SocketService;