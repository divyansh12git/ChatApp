'use client'
import { useState,useRef,useEffect } from "react";
import { MessageSquareMoreIcon, Phone, Search, User2Icon as Profile } from "lucide-react";
import { Settings } from "lucide-react";
import Image from "next/image";
import Logout from "./logout";
import requestIcon from "./request.png";
function Appbar({currentStatus}:any) {
    const [index,setIndex]=useState(0);
    const eleRefA=useRef(null);
    const eleRefB=useRef(null);
    const eleRefC=useRef(null);
    const eleRefD=useRef(null);
    useEffect(()=>{
        // console.log(index);
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
    },[index]);
    function handleClick(x:number){
        setIndex(x);
        currentStatus(x);
    }
    return (
        <div className="bg-[rgb(24,23,29)] col-span-1 flex flex-col items-center  ">    
        <div className=" fixed gap-5 flex flex-col justify-center items-center      h-[100vh]">
            <div ref={eleRefA} className="hover:bg-[#ffffff18]  w-12 h-12  flex justify-center items-center rounded-full" onClick={(e)=>handleClick(0)}>
                <MessageSquareMoreIcon className=" h-8 w-8 text-white " />
            </div>
            <div ref={eleRefB} className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" onClick={(e)=>handleClick(1)}>
                <Search className="h-8 w-8 text-white"/>
            </div>
            <div ref={eleRefC} className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" onClick={(e)=>handleClick(2)}>
                <Image  style={{filter:'invert(1)'}} src={requestIcon} alt='request_icon' className="text-white h-8 w-8 mt-1 " />
            </div>
            <div ref={eleRefD} className="hover:bg-[#ffffff18]  w-12 h-12 flex justify-center items-center rounded-full" onClick={(e)=>handleClick(3)}>
                <Profile className="h-8 w-8 text-white" />
            </div>
            
            <Logout  />
        </div>
         </div>
    );
}

export default Appbar;