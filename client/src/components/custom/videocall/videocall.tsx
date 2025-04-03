'use client'
import { Mic, Video, Settings, PhoneOff } from 'lucide-react';
import {useEffect} from "react";
import {useSocket} from "@/lib/provider/socket/socketProvider"
import {usePeer} from "@/lib/provider/peer"
import { useSelector,useDispatch } from 'react-redux';
import { RootState } from '@/lib/store/store';
import {end,start} from "@/lib/store/slice/function/videoCall"
import { endIncoming } from '@/lib/store/slice/function/incomingCall';
const VideoCall=({myId,userId,roomId,myProfilePic}:{myId:number,userId:number,roomId:string,myProfilePic:string})=>{
    const username=useSelector((state:RootState)=>state.username);
    let videoCallController=useSelector((state:RootState)=>state.videoCall);
    const socket=useSocket();
    const dispatch=useDispatch();
    const {resetPeer}=usePeer();

    useEffect(()=>{
        socket.on('call-busy',handleBusy);
        socket.on("sender-decline",senderDecline);
        return ()=>{
            socket.off('call-busy',handleBusy);
            socket.off("sender-decline",senderDecline);
        }
    },[])

    const handleEndCall=()=>{
        socket.emit('sender-decline',{roomId});
        dispatch(end());
        resetPeer();
    }
    const handleBusy=()=>{
        console.log("user busy...");
        dispatch(end());
    }
    const senderDecline=()=>{
        console.log("yooo");
              dispatch(endIncoming());
              dispatch(end());
    }
    useEffect(()=>{
        // getUserMediaStream();
    })


    return (
        <div className="flex w-full h-full flex-col justify-center items-center gap-6 bg-[#2d2d30] text-white p-6 relative overflow-hidden">
            {/* <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(255,255,255,0.05),_transparent)] blur-3xl opacity-20"></div> */}
            <h2 className="text-2xl font-semibold z-10">Video Call: {myId} & {userId} in {roomId}</h2>
            
            <div className="flex justify-center w-full gap-6 z-10">
                <div className="w-[30rem] h-[18rem] rounded-lg border border-gray-500 bg-[#1e1e1e] shadow-lg flex items-center justify-center text-gray-400 text-lg">
                    Your Video
                </div>
                <div className="w-[30rem] h-[18rem] rounded-lg border border-gray-500 bg-[#1e1e1e] shadow-lg flex items-center justify-center text-gray-400 text-lg">
                    Other Participant
                </div>
            </div>
            
            <div className='flex items-center justify-center gap-4 mt-4 bg-[#1e1e1e] p-3 rounded-lg shadow-md z-10'>
                <button className={actionButton} onClick={()=>{}}><Mic size={20} /></button>
                <button className={actionButton} onClick={()=>{}}><Video size={20} /></button>
                <button className={actionButton} onClick={()=>{}}><Settings size={20} /></button>
                <button className={endCallButton} onClick={handleEndCall}><PhoneOff size={20} /></button>
            </div>
        </div>
    );
};

const actionButton = `bg-gray-700 hover:bg-gray-600 border border-gray-500 rounded-full p-3 text-white transition-all duration-200 shadow-md flex items-center justify-center`;
const endCallButton = `bg-red-600 hover:bg-red-500 border border-red-500 rounded-full p-3 text-white transition-all duration-200 shadow-md flex items-center justify-center`;

export default VideoCall;