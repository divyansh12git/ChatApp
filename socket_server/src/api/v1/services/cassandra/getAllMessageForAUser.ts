import { message } from "../../interfaces/entities"
import { getMessages } from "./getMessages"

type resultMessages={
    userId:number;
    messageData:message[];
}

const getAllMessagesForAUser=async (userId:string,friends:number[]):Promise<any>=>{
    const data:resultMessages[]=[];
    try{
        friends.map((friendId)=>{
            getMessages({sender_id:userId,receiver_id:friendId}).then((res)=>{
                data.push({userId:friendId,messageData:res});
            });
            
        });
    }catch(e){
        console.log(e);   
    }
    return data;

}
export default getAllMessagesForAUser;