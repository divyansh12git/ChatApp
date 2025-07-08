'use client'
import {useState,useEffect, useCallback} from "react";
import { Phone,MoreVertical, PhoneOff } from "lucide-react"
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/lib/store/store";
import toast, { Toaster } from 'react-hot-toast';
import {incoming,endIncoming} from "@/lib/store/slice/function/incomingCall"
import {start,end} from "@/lib/store/slice/function/videoCall"
import { useSocket } from "@/lib/provider/socket/socketProvider";
import {usePeer} from "@/lib/provider/peer"

// import 
export default function Topbar({id,roomId,username,profilepic,makeVideoCall}:{id:number,roomId:string,username:string,profilepic:string,makeVideoCall:any}) {
    const onlineUsers=useSelector((state:RootState)=>state.online);
    const calling=useSelector((state:RootState)=>state.videoCall);
    const dispatch=useDispatch();

    const incomingCall=useSelector((state:RootState)=>state.incomingCall);
    const [sdp,setSDP]=useState(null);
    // const videoCallController=useSelector((state:RootState)=>state.videoCall);
    let isOnline=false;
    if(onlineUsers.some((e)=>e===Number(id))){
        isOnline=true;
    }
    const socket=useSocket();
    const {createAnswer,resetPeer}=usePeer();

   
    
    const handleIncomingCall=(data:any)=>{
        if(calling.ongoing){
            socket.emit('call-busy',{roomId:roomId});
            return;
        }
        // console.log("incoming call from :", data.callerId,"sdp: ",data.offer);
        setSDP(data.offer)
        dispatch(incoming({friendId:data.callerId,friendName:data.callerName,friendProfilePic:data.callerProfilePic}))
    
    };

    const responseIncomingCall=async(action:boolean)=>{
        if(sdp){
            if(action){
                console.log("step-2 (user-2): getting sdp:");
                console.log(sdp);
                const ans=await createAnswer(sdp);
                console.log("step-3 (user-2):creating answer ");
                console.log(ans);
                socket.emit('call-accepted',{roomId:roomId,ans});
                dispatch(start({friendId:incomingCall.friendId}))
                console.log(ans);
            }else{
                socket.emit('call-decline',{roomId:roomId});
                dispatch(end());
            }
        }
        dispatch(endIncoming());
    }

    const senderDecline=()=>{
        console.log("sender decline")
        dispatch(endIncoming());
        resetPeer();
    }

    const handleCall=()=>{
        if(!isOnline){
            toast.error("User is not online!!");
            return;
        }
        console.log("call");
        makeVideoCall();
    }

    useEffect(()=>{
        socket.on("incoming-call",handleIncomingCall);
        socket.on("sender-decline",senderDecline);
        return ()=>{
            socket.off("incoming-call",handleIncomingCall);
            socket.off("sender-decline",senderDecline);
        }
    },[handleIncomingCall,senderDecline]);

    const profile={
        backgroundSize: 'cover',backgroundPosition: 'center', backgroundImage: `url(${profilepic})`,
    }
    if(!incomingCall.status){
        return (
            <>
                <Toaster />
                
                <div className=" sticky top-0  w-full h-20 bg-[#18171d] grid grid-cols-4">
                    <div className="pl-5 col-span-3 flex items-center gap-2"> 
                        <div className=" w-20 flex justify-center items-center  ">
                            <div style={profile} 
                            className="bg-white w-[3.2rem] h-[3.2rem] rounded-full border border-white"></div>
                        </div>
                            <div className="flex flex-col justify-center">
                                <p className="text-white font-light text-xl -mb-1">{username}</p>
                                <p className="text-zinc-500 font-light text-sm"> {isOnline?"online":""}</p>
                            </div>
                    </div>
                    <div className="col-span-1 flex justify-center items-center gap-5">
                        <div className="hover:bg-zinc-600 bg-zinc-700  w-10 h-10 flex justify-center items-center rounded-full" onClick={()=>handleCall()} >
                            <Phone className="h-4 w-4 text-white" />
                        </div>
                        <div className="hover:bg-zinc-600 bg-zinc-700 w-10 h-10 flex justify-center items-center rounded-full" >
                            <MoreVertical className="h-4 w-4 text-white" />
                        </div>
                    </div>
                </div>
            </>
        )
    }else{
        return(
            <>

        <div className="sticky top-0 w-full h-20 bg-[#18171d] flex items-center justify-between px-5">
    {/* Profile Picture */}
    <div className="flex items-center gap-3">
        <div className="w-[3.2rem] h-[3.2rem] rounded-full border border-white bg-white" style={profile}></div>
        <p className="text-white font-light text-lg">Incoming call from <span className="font-medium">{incomingCall.friendName}</span></p>
    </div>

        {/* Accept & Reject Buttons */}
        <div className="flex gap-4">
            <button 
                className="bg-green-500 hover:bg-green-600 w-10 h-10 flex justify-center items-center rounded-full"
                onClick={(e)=>{responseIncomingCall(true);}}
            >
                <Phone className="h-5 w-5 text-white" />
            </button>
            <button 
                className="bg-red-500 hover:bg-red-600 w-10 h-10 flex justify-center items-center rounded-full"
                onClick={(e)=>{responseIncomingCall(false);}}
            >
                <PhoneOff className="h-5 w-5 text-white" />
            </button>
        </div>
        </div>
        </>
        );
    }
}
