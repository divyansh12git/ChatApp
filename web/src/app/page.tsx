'use client'
import { useSocket } from "@/context/socketprovider";
import { useState } from "react";
export default function Home() {
  const [message,setMessage]=useState('');
  const {sendMessage}=useSocket();
  return (
   <main>
    <h1>Chat App</h1>
    <div className="flex flex-col h-[70vh] w-full justify-center items-center">
      <div className="h-56 w-96 border border-black  ">
        All messages will appear here-
      </div>
      <div>
        <input onChange={e=>setMessage(e.target.value)} className="border border-black p-2"  type="text" placeholder="type your message here" />
        <button onClick={e=>{sendMessage(message)}} className="bg-gray-800 text-white rounded-xl w-32 h-10" >Send</button>
      </div>
    </div>
   </main>
  );
}
