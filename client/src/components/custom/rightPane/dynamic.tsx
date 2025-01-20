'use client'
import { useState, useEffect, useRef } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useRoom } from "@/hooks";
import { Room, Message } from "@/lib/types/entities";
import getDateFormat from "@/lib/utils/date";
import { Topbar, InputBox, MessageBox } from "@/components/custom";
import { getMessages } from "@/lib/services/api/socket_server/getmessages";
import profile1 from "../../../../public/images/profile/2.png";
import { Loader } from "@/components/ui";
import { updatePrevMessages,clearPrevMessages } from "@/lib/store/slice/prevmessages";
const profilepic = {
    backgroundImage: `url(${profile1.src})`, // .src gives the URL path of the image
}

type prevMessage={
    id:number,
    sender:number,
    msg:string,
    time:string
}
const DynamicMessagingArea = () => {
    const [loading,setLoading]=useState(false);
    const dispatch=useDispatch();
    const currentFriend = useSelector((state: RootState) => state.currentFriend);
    const myId=Number(useSelector((state:RootState)=>state.personalInformation.id));
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const roomId = currentFriend.roomId;
    const friendId = Number(currentFriend.id);

    // const xx=useSelector((state:RootState)=>state.messages);
    let messagesData = useSelector((state: RootState) => state.messages.find((e) => e.friendId === friendId));
    let prevMessagesData = useSelector((state: RootState) => state.prevMessages.find((e) => e.friendId === friendId));

    let currentMessageId=0;
    let messages:Message[]=[];
    if (messagesData) {
        messages = messagesData.messages;
        // console.log(messages);
        messages = [...messages].sort((a, b) => a.id - b.id);
        
        if (messages.length > 0) {
            currentMessageId=messages[messages.length - 1].id;
        }
    }
    let prevMessages:prevMessage[]=[];
    if(prevMessagesData){
        prevMessages=prevMessagesData.messages;
    }
    //fetching previous message hitory if any:
    useEffect(()=>{
        //@ts-ignore
        // console.log(prevMessagesData);
        if(!prevMessagesData || prevMessagesData.messages.length===0){
            setLoading(true);

            getMessages({sender_id:myId,receiver_id:friendId}).then((data)=>{
                // console.log(data);
                if(data.length){
                    dispatch(clearPrevMessages({id:friendId}))
                    data.map((msg:prevMessage)=>{
                        dispatch(updatePrevMessages({id:friendId,message:msg}));
                    });
                }
            }).finally(()=>setLoading(false));
        }

    },[currentFriend])

    useEffect(() => {
        // @ts-ignore
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
      }, [messages]);

    return (
        <div className="col-span-7  h-full  flex flex-col justify-between bg-zinc-400 w-full ">
            <Topbar username={currentFriend.username} profilepic={`${profile1.src}`} id={friendId} />
            <div  style={{ overflow: "auto", scrollbarWidth: "none" }} className="h-[32.5rem] mb-2 mx-4">

                <div style={{ overflow: "auto", scrollbarWidth: "none" }} className="  overflow-y-scroll overflow-x-hidden flex flex-col ">
                    {
                        loading?<div className="mx-auto"><Loader /></div>:
                        prevMessages.map((msg) => (
                            <MessageBox message={msg.msg} sender={msg.sender===myId} time={msg.time} key={msg.id} />      
                        ))
                    }

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