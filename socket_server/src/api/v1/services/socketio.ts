import {Server} from "socket.io";

const allowedClient=[
    "http://localhost:3000"
]

class SocketService{
    private _io: Server;

    constructor(httpServer:any){
        console.log("Initialised Socket server...");
        this._io=new Server(httpServer,{
            cors: { origin: allowedClient }
        });
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
            socket.on('joinRoom',(roomId)=>{
                if (!socket.rooms.has(roomId)) {
                    socket.join(roomId);
                    console.log(`User ${socket.id} joined room: ${roomId}`);
                    socket.to(roomId).emit('user-joined', `User ${socket.id} has joined the room`);
                }
            })

            socket.on('message', (data) => {
                const { id,roomId, msg, senderId,time } = data;
                console.log(data);
                console.log('message: ' + msg);
                socket.in(roomId).emit('receive-message', {
                    id:id,
                    sender: senderId,
                    msg,
                    time
                });
              });
        });
    }





    get io():Server{
        return this._io;
    }
    

}

export default SocketService;