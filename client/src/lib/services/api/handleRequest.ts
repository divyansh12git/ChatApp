import axios from "axios";
import { handler } from "tailwindcss-animate";

interface handleRequestParams{
    myId:number,
    userId:number,
    action:boolean,
    sending:boolean
}

const handleRequest=async({myId,userId,action,sending}:handleRequestParams)=>{
    let result=false;
    if(sending){
        try{
            const response=await axios.post("/api/sendrequest",{
                myId:myId,
                userId:userId,
            });
            if(response.data.success){
                result=response.data.data;
            }
        }catch(e){
            console.log(e);
        }
    }else{
        try{
            const response=await axios.post("/api/actiononrequest",{
                myId:myId,
                userId:userId,
                action:action
            });
            if(response.data.success){
                console.log(response.data.data);
                result=response.data.data;
            }
        }catch(e){
            console.log(e);
        }
    }
    return result;
}

export default handleRequest;