'use client'
import { useState, useEffect, useRef, useCallback } from "react"
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/lib/store/store";
import { useRoom } from "@/hooks";
import { Room, Message } from "@/lib/types/entities";
import getDateFormat from "@/lib/utils/date";
import { Topbar, InputBox, MessageBox } from "@/components/custom";
import { getMessages } from "@/lib/services/api/socket_server/getmessages";
import profile1 from "../../../../public/images/profile/2.png";
import { Loader } from "@/components/ui";
import VideoCall from "../videocall/videocall"
import{start,end} from "@/lib/store/slice/function/videoCall"

import { updatePrevMessages,clearPrevMessages } from "@/lib/store/slice/prevmessages";
import { useSocket } from "@/lib/provider/socket/socketProvider";
import { usePeer } from "@/lib/provider/peer";
import { endIncoming } from "@/lib/store/slice/function/incomingCall";
import { incomingCall } from "@/lib/store/slice";
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
    const myData=(useSelector((state:RootState)=>state.personalInformation));
    const myProfilePic=useSelector((state:RootState)=>state.personalInformation.profilePictureURL);
    const messagesEndRef = useRef<HTMLDivElement | null>(null);
    const roomId = currentFriend.roomId;
    const friendId = Number(currentFriend.id);
    const calling=useSelector((state:RootState)=>state.videoCall);
    const videoCallController=useSelector((state:RootState)=>state.videoCall);

    const socket=useSocket();
    const {peer,createOffer,setRemoteAnswer}=usePeer();
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

     useEffect(()=>{
        socket.on('receiver-accepted',startVideoCall);
        socket.on('receiver-declined',endVideoCall);
        // console.log(calling.ongoing);
        
        return()=>{
            socket.off('receiver-accepted',startVideoCall);
            socket.off('receiver-declined',endVideoCall);
            
        }
     },[]);

      const makeVideoCall=async()=>{
        if(videoCallController.ongoing)return;
        const offer=await createOffer();
        socket.emit('call-user',{roomId,offer,callerId:myId,callerName:myData.name,callerProfilePic:myProfilePic});
        dispatch(start({ongoing:true,friendId}));   
        dispatch(endIncoming()); 
      }

      const startVideoCall=async({ans}:{ans:any})=>{
        console.log("fro acceppted");
        console.log("call accepted :",ans);
        await setRemoteAnswer(ans);
        dispatch(start({ongoing:true,friendId})); 

        // dispatch(endIncoming());
      };

      const endVideoCall=()=>{
        dispatch(end());
        
        // dispatch(endIncoming());
      }
      


    return (
        <div className="col-span-7  h-full  flex flex-col justify-between bg-zinc-400 w-full ">
            <Topbar username={currentFriend.username} profilepic={`${profile1.src}`} id={friendId} roomId={roomId} makeVideoCall={makeVideoCall}/>
            {videoCallController.ongoing?
            <VideoCall myId={myId} roomId={roomId} userId={friendId} key={friendId}   myProfilePic={myProfilePic} />
                :
            <div>
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
            </div>}
        </div>
    );
}
export default DynamicMessagingArea;

