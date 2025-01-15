import { executeQueries } from "../../controller/cassandra/executeQueries";
import generateChatId from "../../helper/generate_chatId";

const getMessages=async({sender_id,receiver_id}:{sender_id:number,receiver_id:number})=>{

    const chatId=generateChatId(sender_id,receiver_id);
    // const chatId='u1_u2';
    const query=`SELECT * FROM chat_messages WHERE chat_id='${chatId}'` ;
    const result=await executeQueries([query]);
    // console.log(result);
    if(result?.length){
        console.log(result[0].rows);
    }
}
export {getMessages};
