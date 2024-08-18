import { IMessageDB,Message,Room } from "../../interfaces";
import Database from "../../services/database";
import time from "../../helper/time"
import RoomDBManager from "./roomdbcontroller";

const dummyMessage:Message={
    authorId:1,
    roomId:1,
    time:time().toString(),
    content:"Hi bro"
}
class MessageDBManager implements IMessageDB{
    private Client:Database;
    constructor(){
        this.Client=Database.getDbInstance();
        if(!this.Client.isConnected())this.Client.connect();
    }
    async createMessage(data: Message): Promise<number> {
        const handler=Database.Client;
        let result=-1;
        try{
            await handler?.message.create({
                data:{
                    authorId:data.authorId,
                    time:data.time,
                    roomId:data.roomId,
                    content:data.content
                }
                
            }).then((user)=>{
                result=user.id
            })
        }catch(e){
            console.log(e);
        }
        return result;
    }
    async getMessagesInRoom(roomId: number): Promise<Message[] | []> {
        const handler=Database.Client;
        let result:any=[];
        try{
            result=await handler?.message.findMany({
                where:{
                    room:{
                        id:roomId
                    }
                }
                
            })
        }catch(e){
            console.log(e);
        }
        return result;
    }
}
export default MessageDBManager;