import { executeQueries } from "../../controller/cassandra/executeQueries";
import generateChatId from "../../helper/generate_chatId";
interface params{
    sender_id:any,
    receiver_id:any,
    message:string,
    time:string
}
const insertMessage=async({sender_id,receiver_id,message,time}:params)=>{
    const chatId=generateChatId(sender_id,receiver_id);
    const query=`INSERT INTO chat_messages (id, chat_id,timestamp,message,receiver_id,sender_id,time) VALUES(uuid(),'${chatId}', toTimestamp(now()), '${message}' , ${receiver_id},${sender_id},'${time}');` ;
    const result=await executeQueries([query]);
    if(result[0])return true;
    else return false;
}
export default insertMessage;