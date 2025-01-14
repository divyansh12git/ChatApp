
import { useSocket } from "./socketProvider";


class SocketFunctions{
    private socket:any;
    
    SocketFunctions(){
        this.socket=useSocket();
    }

    async joinRoom(roomId:string):Promise<boolean>{
        let status=false;
        console.log("Hi from join room");
        // if(!(this.socket && (roomId)))return status 
        // try{
            console.log("Hi from joinig");
            await this.socket.emit("joinRoom",roomId).then(()=>{status=true;console.log(`joined: ${roomId}`)});
        // }catch(e){
        //     console.log(e);
        // }
        return status;
    }



}
export default SocketFunctions;