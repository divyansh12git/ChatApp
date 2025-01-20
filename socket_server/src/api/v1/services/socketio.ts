import {Server} from "socket.io";

const allowedClient=[
    "http://localhost:3000"
]

class SocketService{
    private _io: Server;
    private socketToId:Map<string,{userId:string,roomId:string}> | null=null;
    constructor(httpServer:any){
        console.log("Initialised Socket server...");
        this._io=new Server(httpServer,{
            cors: { origin: allowedClient }
        });
        this.socketToId=new Map<string,{userId:string,roomId:string}>();
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
            socket.on('joinRoom',({roomId,userId})=>{
                console.log(roomId+" "+userId)
                if (!socket.rooms.has(roomId)) {
                    socket.join(roomId);
                    console.log(`User ${socket.id} joined room: ${roomId}`);
                    //setting the data in map
                    this.socketToId?.set(socket.id,{userId:userId,roomId:roomId});
                    
                    socket.to(roomId).emit('user-joined', { id: userId, message: 'User has left' });
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
              socket.on('disconnect', () => {
                const socketData=this.socketToId?.get(socket.id);
                console.log(`User disconnected: ${socket.id} ${socketData?.roomId} ${socketData?.userId}`);
                // Emit to all connected clients that this user disconnected
                if(socketData){
                    io.to(socketData.roomId).emit('user-disconnected', { id: socketData.userId, message: 'User has left' });
                    this.socketToId?.delete(socket.id);
                }
              })
        });
        
    }





    get io():Server{
        return this._io;
    }
    

}

export default SocketService;