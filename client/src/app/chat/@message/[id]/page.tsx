'use client'
import {useState,useEffect, useRef} from "react"
import { Topbar,InputBox,MessageBox } from "@/components/custom";

import getDateFormat from "@/lib/utils/date";
import profile1 from "../../../../../public/images/profile/1.png"
const profilepic = {
    backgroundImage: `url(${profile1.src})`, // .src gives the URL path of the image
    
}

export default function UserMessage({ params }: { params: { id: string } }) {
    const areaRef=useRef(null);
    const [childComponents, setChildComponents] = useState<any>([]);

    useEffect(() => {
        if (areaRef.current) {
          // @ts-ignore
          areaRef.current.scrollTop = areaRef.current.scrollHeight;
        }
      }, [childComponents]);
    
      const populateMessages = (message:string,sender:boolean,date?:string) => {
        const newid=childComponents.length+1;
        if(!date){
            date=getDateFormat();
        }
        setChildComponents((prevComponents:any)=>[
            ...prevComponents,
            <MessageBox message={message} sender={sender} time={date} key={newid}  />
        ]);     
    }
    return (
        <div className="col-span-7  h-full  flex flex-col justify-between bg-zinc-400 w-full ">
            <Topbar username={params.id} profilepic={`${profile1.src}`} status="online" />
            <div ref={areaRef} style={{overflow: "auto", scrollbarWidth: "none"}} className="h-[32.5rem] mb-2 mx-4">

                <div  style={{overflow: "auto", scrollbarWidth: "none"}}  className="  overflow-y-scroll overflow-x-hidden flex flex-col ">
                    {childComponents}
                </div>
            </div>
            <InputBox populateMessages={populateMessages}/>
            
        </div>
    );
}