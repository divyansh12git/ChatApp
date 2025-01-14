'use client'
import { SendHorizonal } from "lucide-react";
import { useState,useCallback } from "react";
import { useDispatch } from "react-redux";
import {updateMessage} from "@/lib/store/slice/messages"
import { Message } from "@/lib/types/entities";
import getDateFormat from "@/lib/utils/date";
import { useSocket } from "@/lib/socket/socketProvider";
interface InputBoxProps {    
    currentMessageId: number;
    friendId:number;
    roomId:string,
    myId:number
}

const InputBox: React.FC<InputBoxProps> = ({currentMessageId, friendId, roomId, myId }) =>{

    const [message,setMessage]=useState<string>('');
    const dispatch=useDispatch();
    const socket=useSocket();
    

    const sendMessage=useCallback(
        (e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
            e.preventDefault();
            if(message==='') return;
            const time=getDateFormat();
            // console.log(message)
            // populateMessages(message,true,time);
            const msg:Message={
                id:currentMessageId,
                data:message,
                sendByMe:true,
                time:time
            }
            //adding messsage to the redux store
            dispatch(updateMessage({id:Number(friendId),message:msg}));
            
            console.log(myId+" from sender");
            const data={
                id:currentMessageId,
                roomId:roomId,
                msg:message,
                senderId:myId,
                time:time
            }
            //sending this message to socket room
            socket.emit("message",data);


            setMessage('');
        },[message, currentMessageId, friendId, dispatch]
    );
    const keyDown=(e:React.KeyboardEvent<HTMLInputElement>)=>{
        if(e.key==='Enter'){
            //@ts-ignore
            sendMessage(e);
        }
    }
    const handleChange=(e:React.ChangeEvent<HTMLInputElement>)=>{
        setMessage(e.target.value);
    }
    return (
        <div className="self-end p-2 my-3 flex items-center justify-center bg-zinc-700 w-[98%] mx-auto rounded-full">
                <input onKeyDown={keyDown}  type="text" placeholder={"type the message"} className="w-full bg-transparent focus:outline-none flex items-center font-light text-white  pl-5" onChange={(e)=>handleChange(e)} value={message}/> 
                <div className="mx-auto"></div>
                <div className="self-end hover:bg-zinc-600 bg-zinc-800 w-10 h-10 flex justify-center items-center rounded-full" onClick={(e:any)=>sendMessage(e)}>
                    <SendHorizonal className="h-4 w-4 text-white" />
                </div>
        </div>
    );
}

export default InputBox;