import { useDispatch } from "react-redux";
import { useSocket } from "./socketProvider";
import {initOnlineUsers} from "@/lib/store/slice/lists/online"

class SocketFunctions{
    private socket:any;
    private dispatch:any;
    SocketFunctions(){
        this.socket=useSocket();
        this.dispatch=useDispatch();
    }

    async joinRoom(roomId:string):Promise<boolean>{
        let status=false;
        console.log("Hi from join room");
        // if(!(this.socket && (roomId)))return status 
        // try{
            console.log("Hi from joinig");
            await this.socket.emit("joinRoom",roomId).then(()=>{
                status=true;console.log(`joined: ${roomId}`)
                
            });
            // }catch(e){
        //     console.log(e);
        // }
        return status;
    }



}
export default SocketFunctions;

function updateOnlineUsers(arg0: { id: never; }): any {
    throw new Error("Function not implemented.");
}
