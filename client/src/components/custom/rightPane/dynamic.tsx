'use client'
import { useState, useEffect, useRef } from "react"
import { useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useRoom } from "@/hooks";
import { Room, Message } from "@/lib/types/entities";
import getDateFormat from "@/lib/utils/date";
import { Topbar, InputBox, MessageBox } from "@/components/custom";

import profile1 from "../../../../public/images/profile/2.png";

const profilepic = {
    backgroundImage: `url(${profile1.src})`, // .src gives the URL path of the image
}

const DynamicMessagingArea = () => {

    const currentFriend = useSelector((state: RootState) => state.currentFriend);
    const myId=Number(useSelector((state:RootState)=>state.personalInformation.id));
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const roomId = currentFriend.roomId;
    const friendId = currentFriend.id;
    // const xx=useSelector((state:RootState)=>state.messages);
    let messagesData = useSelector((state: RootState) => state.messages.find((e) => e.friendId === Number(friendId)));
    // console.log(roomId)
    console.log(friendId)
    console.log(messagesData);
    // console.log(xx);
    let currentMessageId=0;
    let messages:Message[]=[];
    if (messagesData) {
        messages = messagesData.messages;
        console.log(messages);
        messages = [...messages].sort((a, b) => a.id - b.id);
        
        if (messages.length > 0) {
            currentMessageId=messages[messages.length - 1].id;
        }
    }

    useEffect(() => {
        // @ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
        <div className="col-span-7  h-full  flex flex-col justify-between bg-zinc-400 w-full ">
            <Topbar username={currentFriend.username} profilepic={`${profile1.src}`} status="online" />
            <div  style={{ overflow: "auto", scrollbarWidth: "none" }} className="h-[32.5rem] mb-2 mx-4">

                <div style={{ overflow: "auto", scrollbarWidth: "none" }} className="  overflow-y-scroll overflow-x-hidden flex flex-col ">
                    {
                        messages.map((msg) => (
                            <MessageBox message={msg.data} sender={msg.sendByMe} time={msg.time} key={msg.id} />
                        ))
                    }
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <InputBox currentMessageId={currentMessageId+1} roomId={roomId} friendId={friendId} myId={myId} />

        </div>
    );
}
export default DynamicMessagingArea;