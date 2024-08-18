import { MessageDBManager, RoomDBManager } from "./api/v1/controller/database";
import { Message, Room } from "./api/v1/interfaces";
import time from "./api/v1/helper/time"


(
    
    async ()=>{
        const room:Room={
            users:[],
            roomName:"Chat-room-5",
            createdAt:time().toString(),
            createdBy:2,
            message:[],
        }
        const dummyMessage:Message={
            authorId:2,
            roomId:3,
            time:time().toString(),
            content :"What's up buddy"
        }
        const manager=new RoomDBManager();
        // const rid=await manager.createRoom(room);
        // console.log(rid);
        // console.log(r);
        // const user=await manager.searchRoomById(r)
        // console.log(user);
        // const a=await manager.addUserToRoom({roomId:1,userToAddId:2});
        // console.log(a);
        // const x=await manager.removeUserFromRoom({roomId:1,userRemovingId:1,userToRemoveId:2});
        // console.log(x);
        // const r=await manager.getUsersInRoom(1);
        // const user=await manager.searchRoomById(1)
        // console.log(r);
        // const r=manager.deleteRoom({roomId:2,userId:1})
        // console.log(r);
        const memanager=new MessageDBManager();
        // const r2=await memanager.createMessage(dummyMessage);
        const r=await memanager.getMessagesInRoom(3);
        console.log(r);
    }
)()