import axios from "axios";

const connectionURL=process.env.NEXT_PUBLIC_SOCKET_SERVER_URL+"/messages";

interface props{
    sender_id:number,
    receiver_id:number,
    message:string,
    time:string
}

const insertMessage=async({sender_id,receiver_id,message,time}:props)=>{
    let status=false;
    try{
        const response:any =await axios.post(`${connectionURL}`+'/insert',{
            sender_id, receiver_id, message, time
        });
        status=response.status
    }catch(e){
        console.log(e);
    }
    return status;
}
export {insertMessage};