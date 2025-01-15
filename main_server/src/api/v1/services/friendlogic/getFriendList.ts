import { UserToRoomController } from "../../controllers";
import { room } from "../../interfaces/userToRoom";
const getFriendList=async(myId:number)=>{
    const list:number[]=[];
    try{
        const handler=new UserToRoomController();
        const userData=await handler.getUserToRoomData(myId);
        if(userData){
            const rooms=userData.rooms;
            rooms.map((el)=>{
                list.push(el.friendID);
            });
        }
    }catch(e){
        console.log(e);
    }
    return list;
}
export default getFriendList;