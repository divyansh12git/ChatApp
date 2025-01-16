import { executeQueries } from "../../controller/cassandra/executeQueries";
import generateChatId from "../../helper/generate_chatId";
import { message } from "../../interfaces/entities";
const getMessages=async({sender_id,receiver_id}:any)=>{

    const chatId=generateChatId(sender_id,receiver_id);
    // const chatId='u1_u2';
    const query=`SELECT * FROM chat_messages WHERE chat_id='${chatId}'` ;
    const result=await executeQueries([query]);
    // console.log(result);
    const messagesData:message[]=[];
    if(result?.length){
        // console.log(result[0].rows);
        const dbData=result[0].rows;

        //sorting messages by time stamp
        //@ts-ignore
        dbData.sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp));
        // console.log(dbData);
        if(dbData.length){
            dbData.map((data:any,ind:any)=>{
                messagesData.push({
                    id:ind,
                    chat_id:data.chat_id,
                    message:data.message,
                    time:data.time,
                    receiver_id:data.receiver_id,
                    sender_id:data.sender_id,
                    timestamp:data.timestamp
                })
            })
        }
    }
    // console.log(messagesData);
    return messagesData;
}
export {getMessages};


