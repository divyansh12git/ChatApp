import { IUserToRoom,room } from "../../../interfaces/userToRoom";
import Database from "../../../models/database";
import {v4 as uuid} from "uuid";
const dummyRoom:room={
    requested:[],//user have to accept this list of friend to be the friend
    requesting:[],// i'm asking for them to accept my request
    rooms:[],//room is related to the friend id
    userId:1
}

//requested:They are Requesting me to ad them
//requesting: I am req them to accept mine


class UserToRoomController implements IUserToRoom{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    
    //get all the data related to a single user
    async getUserToRoomData(myId: number): Promise<room|null> {
        const handler=Database.Client;
        
        try{
            const result=await handler?.userToRoom.findFirst({
                where:{
                    userId:myId
                }
    
            });
            if(result){
                const data:room={
                    id:result.id,
                    requested:result.requested ,
                    requesting:result.requesting ,
                    rooms:result.rooms as {roomID:string,friendID:number}[] ,
                    userId:result.id
                }
                return data;
            }
        }catch(e){
            console.log(e);
        }
        return null;
    }

    //creating a user in this table
    async createUserToRoom(data: room): Promise<number> {
        const handler=Database.Client;
        try{
            const result= await handler?.userToRoom.create({
                data:{
                    requested:data.requested,
                    requesting:data.requested,
                    rooms:data.rooms,
                    userId:data.userId
                }
            })
            if(result){
                return result.id;
            }
        }catch(e){
            console.log(e);
        }
        return -1;
    }

    // deleting a particular friend from a user
    async deleteRoom(id: number): Promise<Boolean> {
        const handler=Database.Client;
        try{
            const result= await handler?.userToRoom.delete({
                where:{
                    id:id
                }
            }).then(()=>{return true;});
            
        }catch(e){
            console.log(e);
        }
        return false;
    }
    
    
    async addRequested({ myId, userId }: { myId: number; userId: number; }): Promise<Boolean> {
        const handler=Database.Client;
        let status=false;
        try{
            const list=await this.getUserToRoomData(myId);
            const id=list?.id;
            if(list && id){
                const data=list.requested;
                data.push(userId);
                await handler?.userToRoom.update({
                    where:{
                        id:id
                    },
                    data:{
                        requested:data
                    }
                }).then(()=>{
                    status= true;
                })
            }
            
        }catch(e){
            console.log(e);
        }
        return status;
    }
    async addRequesting({ myId, userId }: { myId: number; userId: number; }): Promise<Boolean> {
        const handler=Database.Client;
        let status=false;
        try{
            const list=await this.getUserToRoomData(myId);
            const id=list?.id;
            if(list && id){
                const data=list.requesting;
                data.push(userId);
                await handler?.userToRoom.update({
                    where:{
                        id:id
                    },
                    data:{
                        requesting:data
                    }
                }).then(async()=>{
                    //updating another user's requested list
                    await this.addRequested({myId:userId,userId:myId}).then(()=>{
                        console.log("Request Sent")
                        status= true;
                    });

                })
            }
            
        }catch(e){
            console.log(e);
        }
        return status;
    }
    
    async addRooms({ myId, userId }: { myId: number; userId: number; }): Promise<Boolean> {
        const handler=Database.Client;
        let status=false;
        try{
            const roomData:{roomID:string,friendID:number}={
                roomID: uuid(),
                friendID:userId,
            }
            const list=await this.getUserToRoomData(myId);
            const id=list?.id;
            if(list && id){
                const data=list.rooms;
                data.push(roomData);
                await handler?.userToRoom.update({
                    where:{
                        id:id
                    },
                    data:{
                        rooms:data
                    }
                }).then(()=>{
                    status=true;
                })
            }
            
        }catch(e){
            console.log(e);
        }
        return status;

    }
    async removeRequested( {myId,userId,status}:{ myId: number ,userId: number, status: Boolean }): Promise<Boolean> {
        const handler=Database.Client;
        try{
            //updating mine list if i  have accepted other's request
            const roomData:{roomID:string,friendID:number}={
                roomID: uuid(),
                friendID:userId,
            }
            let s1=false,s2=false;
            const list=await this.getUserToRoomData(myId);
            const id=list?.id;
            if(list && id){
                let data=list.requested;
                let rooms=list.rooms;
                if(status){
                    rooms.push(roomData);
                }
                data=data.filter((e)=>e!==userId);
                await handler?.userToRoom.update({
                    where:{
                        id:id
                    },
                    data:{
                        requested:data,
                        rooms:rooms
                    }
                }).then(()=>s1=true);
            }
            //updating the other user's details
            await this.removeRequesting({myId:userId,userId:myId,status:status}).then(()=>s2=true);
            
            if(s1 && s2){
                return true;
            }

        }catch(e){
            console.log(e);
        }
        return false;
    }

    async removeRequesting({myId,userId,status}:{ myId: number ,userId: number, status: Boolean }): Promise<Boolean> {
        const handler=Database.Client;
        try{
            // updating mine list if the other user have accepted the request
            const roomData:{roomID:string,friendID:number}={
                roomID: uuid(),
                friendID:userId,
            }
            let result=false;
            const list=await this.getUserToRoomData(myId);
            const id=list?.id;
            if(list && id){
                let data=list.requesting;
                let rooms=list.rooms;
                if(status){
                    rooms.push(roomData);
                }
                data=data.filter((e)=>e!==userId);
                await handler?.userToRoom.update({
                    where:{
                        id:id
                    },
                    data:{
                        requesting:data,
                        rooms:rooms
                    }
                }).then(()=>result=true);
            }
            if(result){
                return true;
            }
       
        }catch(e){
            console.log(e);
        }
        return false;
    }
    async removeFriend({ myId, userId }: { myId: number; userId: number; }): Promise<Boolean> {
        const handler=Database.Client;
        try{
            const list=await this.getUserToRoomData(myId);
            const id=list?.id;
            if(list && id){
                let data=list.rooms;
                data=data.filter((e)=>e.friendID!==userId);
                await handler?.userToRoom.update({
                    where:{
                        id:id
                    },
                    data:{
                        rooms:data
                    }
                }).then(()=>{
                    return true;
                })
            }
        }catch(e){
            console.log(e);
        }
        return false;
    }

}
export default UserToRoomController;