import { UserToRoomController } from "../../controllers"
import { room } from "../../interfaces/userToRoom";

const getRequestRequestingList=async(myId:number)=>{
    const list:{
        request:number[],
        requesting:number[]
    }={
        request:[],
        requesting:[],
    }
    try{
        const handler=new UserToRoomController();
        const data=await handler.getUserToRoomData(myId);
        if(data){
            list.request=data.requested,
            list.requesting=data.requesting
        }
    }catch(e){
        console.log(e);
    }
    return list
}

export default getRequestRequestingList;