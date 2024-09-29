'use client'
import { SendHorizonal } from "lucide-react";
import { useState } from "react";
const InputBox=({populateMessages}:{populateMessages:(message:string,sender:boolean)=>void})=>{
    const [message,setMessage]=useState<string>('');
    const sendMessage=(e:React.MouseEvent<HTMLButtonElement, MouseEvent>)=>{
        e.preventDefault();
        if(message==='') return;
        // console.log(message)
        populateMessages(message,true);
        setMessage('');
    }
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