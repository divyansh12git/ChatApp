import { IRoomDB,Message,Room } from "../../interfaces";
import Database from "../../services/database";

class RoomDBManager implements IRoomDB{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async createRoom(data:Room):Promise<number>{
        const handler=Database.Client;
        let result=-1;
        try{
            await handler?.room.create({
                data:{
                    createdBy:data.createdBy,
                    createdAt:data.createdAt,
                    roomName:data.roomName,
                }
                
            }).then((user)=>{
                result=user.id
            })
        }catch(e){
            console.log(e);
        }
        return result;
    }
    async deleteRoom({roomId,userId}:{roomId:number,userId:number}):Promise<Boolean>{
        const handler=Database.Client;
        let result=false;
        try{
            await handler?.room.delete({
                where:{
                    id:roomId,
                    createdBy:userId
                }
                
            }).then(()=>{
                result=true;
            })
        }catch(e){
            console.log(e);
        }
        return result;
    }
    async searchRoomById(roomId:number):Promise<Room|null>{
        const handler=Database.Client;
        let result=null;
        try{
            await handler?.room.findFirst({
                where:{
                    id:roomId
                }
                
            }).then((room)=>{
                result=room
            })
        }catch(e){
            console.log(e);
        }
        return result;
    }
    async addUserToRoom({roomId,userToAddId}:{roomId:number,userToAddId:number}): Promise<Boolean>{
        const handler=Database.Client;
        let result=false;
        try{
            await handler?.room.update({
                where:{
                    id:roomId
                },
                data:{
                    users:{
                        push:userToAddId
                    }
                }    
            }).then(()=>{
               result=true;
            })
        }catch(e){
            console.log(e);
        }
        return result;

    }
    async getUsersInRoom(roomId: number): Promise<number[] | []> {
        const handler=Database.Client;
        let result:any=[];
        await handler?.room.findUnique({
            where:{
                id:roomId
            }
        }).then((room)=>{
            result=room?.users;
        });

        return result;
    }
    async removeUserFromRoom({roomId,userToRemoveId,userRemovingId}:
                    {roomId:number,userToRemoveId:number,userRemovingId:number}): Promise<Boolean>{
        const handler=Database.Client;
        let result=false;
        let usersInRoom=await this.getUsersInRoom(roomId);
        console.log(usersInRoom)
        if(usersInRoom.length>0){
            const updatedUserInRoom=usersInRoom.filter(user=>user!==userToRemoveId)
            console.log(updatedUserInRoom)
            try{
                await handler?.room.update({
                    where:{
                        id: roomId,
                           
                            createdBy: userRemovingId
                        
                       
                    },
                    data:{
                        users:updatedUserInRoom       
                    }
                }).then(()=>{
                   result=true;
                })
            }catch(e){
                console.log(e);
            }
        }
        return result;
    }
}
export default RoomDBManager;