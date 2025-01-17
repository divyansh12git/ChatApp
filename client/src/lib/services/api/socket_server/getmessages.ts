import axios from "axios";
type message={
    id:number,
    sender:number,
    msg:string,
    time:string
}
const connectionURL="http://localhost:4000/messages"

const getMessages=async({sender_id,receiver_id}:any)=>{
    const data:message[]=[];
    try{
        console.log(sender_id+" "+receiver_id)
        const response:any =await axios.get(`${connectionURL}`+'/get',{
            headers:{
                userid:sender_id,
                friendid:receiver_id
            }
        });
        // console.log(response.data.data[0].id);
        if(response.data.status===true){
            const chats=response.data.data;
            chats.map((chat:any)=>{
                const temp:message={
                    id:chat.id,
                    msg:chat.message,
                    sender:chat.sender_id,
                    time:chat.time
                }
                data.push(temp);
            });

        }
    }catch(e){
        console.log(e);
    }
    return data;
}
export {getMessages};