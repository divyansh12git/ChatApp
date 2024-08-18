import { IRoomDB,Message,Room } from "../../interfaces";
import Database from "../../services/database";

class RoomManager implements IRoomDB{
    Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async createRoom(data:Room):Promise<number>{
        
        return 5;
    }
    async deleteRoom({roomId,userId}:{roomId:number,userId:number}):Promise<Boolean>{
        
        return true;   
    }
    async searchRoomByName(roomName:string):Promise<Room>{
        const room:Room={
            users:[],
            roomName:"Chatting",
            createdAt:".",
            createdBy:4,
            message:[],
        }
        return room;
    }
    async addUserToRoom({roomId,userToAddId}:{roomId:number,userToAddId:number}): Promise<Boolean>{

        return true
    }
    async removeUserFromRoom({roomId,userToRemoveId,userRemovingId}:
                    {roomId:number,userToRemoveId:number,userRemovingId:number}): Promise<Boolean>{

        return true;
    }
    
}