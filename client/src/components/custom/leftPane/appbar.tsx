'use client'
import { useState,useRef,useEffect } from "react";
import { MessageSquareMoreIcon, Phone } from "lucide-react";
import { Settings } from "lucide-react";
function Appbar({currentStatus}:any) {
    const [index,setIndex]=useState(0);
    const eleRefA=useRef(null);
    const eleRefB=useRef(null);
    const eleRefC=useRef(null);
    const eleRefD=useRef(null);
    useEffect(()=>{
        console.log(index);
        //@ts-ignore
        eleRefA.current.style.backgroundColor="";
        //@ts-ignore
        eleRefB.current.style.backgroundColor="";
        //@ts-ignore
        eleRefC.current.style.backgroundColor="";
        //@ts-ignore
        eleRefD.current.style.backgroundColor="";
        let ref=null;
        switch(index){
            case 0:ref=eleRefA;break;
            case 1:ref=eleRefB;break;
            case 2:ref=eleRefC;break;
            case 3:ref=eleRefD;break;
        }
        //@ts-ignore

        if(ref.current){
            //@ts-ignore
            ref.current.style.backgroundColor="#515a69";
            console.log("hi");
        }
    },[index])
    function handleClick(x:number){
        setIndex(x);
        currentStatus(x);
    }
    return (    
        <div className=" bg-[rgb(24,23,29)] gap-5 col-span-1 flex flex-col justify-center items-center">
            <div ref={eleRefA} className="hover:bg-[#ffffff18]  w-12 h-12  flex justify-center items-center rounded-full" onClick={(e)=>handleClick(0)}>
                <MessageSquareMoreIcon className=" h-8 w-8 text-white " />
            </div>
            <div ref={eleRefB} className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" onClick={(e)=>handleClick(1)}>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon h-8 w-8  icon-tabler  icon-tabler-users-group" width="44" height="44" viewBox="0 0 24 24" stroke-width="1.5" stroke="#000000" fill="none" stroke-linecap="round" stroke-linejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
                    <path d="M10 13a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" stroke="white" />
                    <path d="M8 21v-1a2 2 0 0 1 2 -2h4a2 2 0 0 1 2 2v1" stroke="white" />
                    <path d="M15 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" stroke="white" />
                    <path d="M17 10h2a2 2 0 0 1 2 2v1" stroke="white" />
                    <path d="M5 5a2 2 0 1 0 4 0a2 2 0 0 0 -4 0" stroke="white" />
                    <path d="M3 13v-1a2 2 0 0 1 2 -2h2" stroke="white" />
                </svg>
            </div>
            <div ref={eleRefC} className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" onClick={(e)=>handleClick(2)}>
                <Phone  className="h-8 w-8 text-white" />
            </div>
            <div ref={eleRefD} className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" onClick={(e)=>handleClick(3)}>
                <Settings className="h-8 w-8 text-white" />
            </div>
            
        </div>
    );
}

export default Appbar;