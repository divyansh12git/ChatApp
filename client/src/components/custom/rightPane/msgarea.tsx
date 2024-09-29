'use client'
import { useRef } from "react";
import MessageBox from "./message";

const MessageArea=({areaRef}:any)=>{
    return (
        <div ref={areaRef} style={{overflow: "auto", scrollbarWidth: "none"}} className="h-[32.5rem] mb-2 mx-4   overflow-y-scroll overflow-x-hidden flex flex-col-reverse ">
            
        </div>
    );
}

export default MessageArea;