import {Server} from "socket.io";
import videoCalling from "./videoCalling";

const allowedClient=[
    "http://localhost:3000"
]

class SocketService{
    private _io: Server;
    private socketToId:Map<string,string> | null=null;  //socketId-->userId
    private socketToRooms:Map<string,string[]> | null=null; //socketId-->roomId[]
    private roomToUsers:Map<string,string[]> | null=null;   //roomId-->userId[]
    constructor(httpServer:any){
        console.log("Initialised Socket server...");
        this._io=new Server(httpServer,{
            cors: { origin: allowedClient }
        });
        this.socketToRooms=new Map<string,string[]>();
        this.roomToUsers=new Map<string,string[]>();
        this.socketToId=new Map<string,string>();
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
                    if(!this.socketToRooms?.has(socket.id)){
                        this.socketToId?.set(socket.id,userId);
                    }
                    
                    if(this.socketToRooms?.has(socket.id)){
                        this.socketToRooms.get(socket.id)?.push(roomId);
                    }else{
                        this.socketToRooms?.set(socket.id,[roomId]);
                    }
                    
                    if (this.roomToUsers?.has(roomId)) {
                        // Get the array and push the new user
                        if(!this.roomToUsers?.get(roomId)?.includes(userId)){
                            this.roomToUsers.get(roomId)!.push(userId);
                        }
                    } else {
                        // Initialize the array if the room doesn't exist
                        this.roomToUsers?.set(roomId, [userId]);
                    }


                    //sending the online users to the client
                    const onlineUsers=this.roomToUsers?.get(roomId);
                    console.log("dfdf: "+onlineUsers);
                    if(onlineUsers){
                        io.to(socket.id).emit("online-users",{online:onlineUsers} );
                    }
                    
                

                    socket.to(roomId).emit('user-joined', { id: userId, message: 'User has joined' });
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

              //video calling logic:
            //   videoCalling(socket);
            socket.on("call-user",({roomId,offer,callerId,callerName,callerProfilePic}:{roomId:string,callerId:string,offer:any,callerName:string,callerProfilePic:string})=>{
                console.log(roomId);
                console.log("SDP-> ",offer);
                socket.in(roomId).emit('incoming-call',{
                    callerId,callerName,callerProfilePic,
                    offer
                });
            });
            
            socket.on('call-accepted',({roomId,ans}:{roomId:string,ans:any})=>{
                socket.in(roomId).emit('receiver-accepted',{ans});
            });
            socket.on('call-decline',({roomId})=>{
                socket.in(roomId).emit('receiver-declined',{action:false});
            })
            socket.on('sender-decline',({roomId}:{roomId:string})=>{
                socket.in(roomId).emit('sender-decline');
            })
            socket.on('call-busy',({roomId})=>{
                socket.in(roomId).emit('call-busy');
            })


              socket.on('disconnect', () => {

                const userId=this.socketToId?.get(socket.id);
                
                console.log(`User disconnected: ${socket.id}  ${userId}`);
                // Emit to all connected clients that this user disconnected
                const rooms=this.socketToRooms?.get(socket.id);

                if(rooms){
                    rooms.forEach((roomId:string)=>{
                        if(this.roomToUsers?.has(roomId)){
                            socket.to(roomId).emit('user-disconnected', { id: userId, message: 'User has left' });
                            const updatedUsers = this.roomToUsers?.get(roomId)?.filter((id) => id !== userId);
                            console.log(updatedUsers);
                            if(updatedUsers){
                                this.roomToUsers?.set(roomId, updatedUsers);
                            }
                        }
                    })
                }
                // if(socketData){
                //     console.log("sendong...");
                //     socket.in(socketData.roomId).emit('user-disconnected', { id: socketData.userId, message: 'User has left' });
                //     this.socketToId?.delete(socket.id);
                //     console.log(this.roomToUsers?.get(socketData.roomId));
                //     const updatedUsers = this.roomToUsers?.get(socketData.roomId)?.filter((id) => id !== socketData.userId);
                //     console.log(updatedUsers);
                //     if (updatedUsers) {
                //         this.roomToUsers?.set(socketData.roomId, updatedUsers);
                //     }
                // }
              })
        });
        
    }





    get io():Server{
        return this._io;
    }
    

}

export default SocketService;